import { getAvailableBodyParts, FACE_PARTS, BODY_PARTS } from '../vton';

describe('vton constants', () => {
  test('getAvailableBodyParts should return all expected parts', () => {
    const expectedParts = [
      'Upper-clothes',
      'Skirt',
      'Pants',
      'Dress',
      'Left-shoe',
      'Right-shoe',
      'Face',
      'Left-leg',
      'Right-leg',
      'Left-arm',
      'Right-arm',
    ];
    expect(getAvailableBodyParts()).toEqual(expectedParts);
  });

  test('FACE_PARTS should contain only "Face"', () => {
    expect(FACE_PARTS).toEqual(['Face']);
  });

  test('BODY_PARTS should contain all expected body parts', () => {
    const expectedBodyParts = [
      'Upper-clothes',
      'Pants',
      'Skirt',
      'Dress',
      'Left-leg',
      'Right-leg',
      'Left-arm',
      'Right-arm',
    ];
    expect(BODY_PARTS).toEqual(expectedBodyParts);
  });

  test('should match snapshot', () => {
    expect({
      getAvailableBodyParts: getAvailableBodyParts(),
      FACE_PARTS,
      BODY_PARTS,
    }).toMatchSnapshot();
  });
});
