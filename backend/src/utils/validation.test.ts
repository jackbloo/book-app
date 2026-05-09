const validateWishlistData = (data: any) => {
  if (!data.volumeId) throw new Error('volumeId is required');
  if (typeof data.volumeId !== 'string') throw new Error('volumeId must be a string');
  return true;
};

describe('Wishlist Validation', () => {
  it('should throw error when volumeId is missing', () => {
    expect(() => validateWishlistData({ title: 'Book' })).toThrow('volumeId is required');
  });

  it('should throw error when volumeId is not a string', () => {
    expect(() => validateWishlistData({ volumeId: 123 })).toThrow('volumeId must be a string');
  });

  it('should pass validation with valid data', () => {
    const result = validateWishlistData({
      volumeId: 'valid-id-123',
      title: 'Valid Book'
    });

    expect(result).toBe(true);
  });
});
