import { test, expect } from '@playwright/test';
 
const BASE_URL = 'https://dev.emeli.in.ua/wp-json/wp/v2';
const POSTS_ENDPOINT = `${BASE_URL}/posts`;
 
const AUTH = {
  username: 'admin',
  password: 'Engineer_123'
};
 

const getAuthHeaders = () => ({
  'Authorization': `Basic ${Buffer.from(`${AUTH.username}:${AUTH.password}`).toString('base64')}`,
  'Content-Type': 'application/json'
});
 
test.describe('WordPress Posts API - CRUD Tests', () => {
  let createdPostId: number;
 
  test.beforeAll(async () => {
    console.log('Testing API endpoint:', POSTS_ENDPOINT);
  });
 
  test('CREATE - Should create a new post', async ({ request }) => {
    const postData = {
      title: 'Test Post from Playwright',
      content: 'This is test content created via API automation',
      status: 'publish',
      excerpt: 'Test excerpt'
    };
 
    const response = await request.post(POSTS_ENDPOINT, {
      headers: getAuthHeaders(),
      data: postData //body in postman
    });
 
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
 
    const responseBody = await response.json();
    createdPostId = responseBody.id;
 
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.title.rendered).toBe(postData.title);
    expect(responseBody.status).toBe('publish');
 
    console.log('Created post ID:', createdPostId);
  });
  
 
  test('READ - Should get all posts', async ({ request }) => {
    const response = await request.get(POSTS_ENDPOINT);
 
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
 
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);
 
    // Перевірка структури першого поста
    const firstPost = posts[0];
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('content');
  });
 
  test('READ - Should get a specific post by ID', async ({ request }) => {
    // Використовуємо ID створеного поста або тестовий ID
    const testPostId = createdPostId || 1;
 
    const response = await request.get(`${POSTS_ENDPOINT}/${testPostId}`);
 
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
 
    const post = await response.json();
    expect(post.id).toBe(testPostId);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('content');
    expect(post).toHaveProperty('date');
  });
 
  test('UPDATE - Should update an existing post', async ({ request }) => {
    test.skip(!createdPostId, 'No post created to update');
 
    const updateData = {
      title: 'Updated Test Post',
      content: 'This content has been updated via API',
      excerpt: 'Updated excerpt'
    };
 
    const response = await request.put(`${POSTS_ENDPOINT}/${createdPostId}`, {
      headers: getAuthHeaders(),
      data: updateData
    });
 
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
 
    const updatedPost = await response.json();
    expect(updatedPost.id).toBe(createdPostId);
    expect(updatedPost.title.rendered).toBe(updateData.title);
    expect(updatedPost.content.rendered).toContain('updated');
  });
 
  test('PATCH - Should partially update a post', async ({ request }) => {
    test.skip(!createdPostId, 'No post created to patch');
 
    const patchData = {
      title: 'Patched Title Only'
    };
 
    const response = await request.patch(`${POSTS_ENDPOINT}/${createdPostId}`, {
      headers: getAuthHeaders(),
      data: patchData
    });
 
    expect(response.ok()).toBeTruthy();
    const patchedPost = await response.json();
    expect(patchedPost.title.rendered).toBe(patchData.title);
  });
 
  test('DELETE - Should delete a post', async ({ request }) => {
    test.skip(!createdPostId, 'No post created to delete');
 
    const response = await request.delete(`${POSTS_ENDPOINT}/${createdPostId}`, {
      headers: getAuthHeaders()
    });
 
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
 
    const deletedPost = await response.json();
    //expect(deletedPost.deleted).toBeTruthy();
 
    // Перевірка, що пост дійсно видалено
    const getResponse = await request.get(`${POSTS_ENDPOINT}/${createdPostId}`, {
      headers: getAuthHeaders()
    });

    const updatedPost = await response.json();
    expect(updatedPost.status).toBe('trash');

    // expect(getResponse.status()).toBe(404);
  });
 
  test('Error Handling - Should return 404 for non-existent post', async ({ request }) => {
    const response = await request.get(`${POSTS_ENDPOINT}/999999`);
 
    expect(response.status()).toBe(404);
    const errorBody = await response.json();
    expect(errorBody).toHaveProperty('code');
  });
 
  test('Error Handling - Should return 401 for unauthorized create', async ({ request }) => {
    const postData = {
      title: 'Unauthorized Post',
      content: 'This should fail',
      status: 'publish'
    };
 
    const response = await request.post(POSTS_ENDPOINT, {
      data: postData
      // Без авторизації
    });
 
    expect(response.status()).toBe(401);
  });
 
  test('Filtering - Should filter posts by status', async ({ request }) => {
    const response = await request.get(`${POSTS_ENDPOINT}?status=publish`);
 
    expect(response.ok()).toBeTruthy();
    const posts = await response.json();
    posts.forEach((post: any) => {
      expect(post.status).toBe('publish');
    });
  });
 
  test('Pagination - Should respect per_page parameter', async ({ request }) => {
    const perPage = 5;
    const response = await request.get(`${POSTS_ENDPOINT}?per_page=${perPage}`);
 
    expect(response.ok()).toBeTruthy();
    const posts = await response.json();
    expect(posts.length).toBeLessThanOrEqual(perPage);
  });
});
 
test.describe('WordPress Posts API - Validation Tests', () => {
  test('Should validate required fields', async ({ request }) => {
    const invalidData = {
      // Відсутній обов'язковий title
      content: 'Content without title'
    };
 
    const response = await request.post(POSTS_ENDPOINT, {
      headers: getAuthHeaders(),
      data: invalidData
    });
 
    
    const body = await response.json();
    console.log('Validation response:', body);
  });
 
  test('Should handle special characters in title', async ({ request }) => {
    const specialCharsData = {
      title: 'Test with 特殊字符 & symbols <>"',
      content: 'Testing special characters',
      status: 'draft'
    };
 
    const response = await request.post(POSTS_ENDPOINT, {
      headers: getAuthHeaders(),
      data: specialCharsData
    });
 
    expect(response.ok()).toBeTruthy();
    const post = await response.json();
    expect(post.title.rendered).toContain('特殊字符');
 
    // Cleanup
    await request.delete(`${POSTS_ENDPOINT}/${post.id}`, {
      headers: getAuthHeaders()
    });
  });
});

//спробувати конвертувати в пейджу
//запустити