import isValidEmail from './isValidEmail.js';

describe('isValidEmail', () => {
  // Test 1: Geçerli email formatları
  test('should return true for a valid email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('test.user+alias@gmail.co.uk')).toBe(true);
  });

  // Test 2: Geçersiz email formatları
  test('should return false for an invalid email', () => {
    expect(isValidEmail('test@example')).toBe(false); // Eksik .com
    expect(isValidEmail('test.example.com')).toBe(false); // Eksik @
    expect(isValidEmail('@example.com')).toBe(false); // Kullanıcı adı eksik
    expect(isValidEmail('')).toBe(false); // Boş string
    expect(isValidEmail(null)).toBe(false); // Null değer
    expect(isValidEmail(undefined)).toBe(false); // Undefined değer
  });
});
