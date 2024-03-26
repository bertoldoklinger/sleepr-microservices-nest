describe('Reservations', () => {
  beforeAll(async () => {
    const user = {
      email: 'bertoldokbrj@gmail.com',
      password: 'Testing051199@'
    }
    await fetch('http://auth:3001', {
      method: 'POST',
      body: JSON.stringify(user)
    })
  })
  test('Create', () => {
    
  })
});