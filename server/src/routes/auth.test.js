import request from 'supertest';
import app from '../app.js';
import User from '../Models/schemas/user.schema.js';
import mongoose from 'mongoose';

describe('Auth Routes API', () => {
  // Test başlamadan önce veritabanı bağlantısı için bekle
  beforeAll(async () => {
    // Bağlantının hazır olduğundan emin olmak için kısa bir bekleme
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  // Tüm testler bittikten sonra test kullanıcısını sil ve bağlantıyı kapat
  afterAll(async () => {
    try {
      await User.deleteOne({ email: 'testuser@example.com' });
    } catch (error) {
      console.error('Test kullanıcısı silinirken hata oluştu:', error);
    }
    await mongoose.connection.close();
  });

  describe('POST /auth/register', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'password123',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('email', 'testuser@example.com');
      expect(res.body).toHaveProperty('username', 'testuser');
      expect(res.body).toHaveProperty('token');
    });

    it('should not register a user with an existing email', async () => {
      // İlk kullanıcıyı oluştur (zaten yukarıdaki testte oluşturuldu ama garanti olsun)
      const existingUser = new User({
        username: 'testuser-duplicate',
        email: 'testuser@example.com',
        password: 'password123'
      });
      // Bu testte veritabanı hatası beklendiği için, direkt kaydetme yapmıyoruz.
      // Endpoint'e aynı email ile tekrar istek atıyoruz.

      const res = await request(app)
        .post('/auth/register')
        .send({
          username: 'anotheruser',
          email: 'testuser@example.com',
          password: 'password456',
        });
        
      // Controller'da duplicate email hatası için 409 (Conflict) veya 400 (Bad Request) dönülmeli.
      // Projenizin nasıl bir hata döndürdüğüne göre bu değeri (409) değiştirebilirsiniz.
      expect(res.statusCode).toEqual(409); 
      expect(res.body).toHaveProperty('message');
    });
  });
});
