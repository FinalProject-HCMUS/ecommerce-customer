import enShopData from '../en/shopData.json';
import vnShopData from '../vn/shopData.json';
import enTranslation from '../en/translation.json';
import vnTranslation from '../vn/translation.json';
import enUserMessage from '../en/userMessage.json';
import vnUserMessage from '../vn/userMessage.json';

describe('locales', () => {
  it('en/shopData.json and vn/shopData.json should have the same top-level keys', () => {
    expect(Object.keys(enShopData)).toEqual(Object.keys(vnShopData));
  });

  it('en/translation.json and vn/translation.json should have the same top-level keys', () => {
    expect(Object.keys(enTranslation)).toEqual(Object.keys(vnTranslation));
  });

  it('en/userMessage.json and vn/userMessage.json should have the same top-level keys', () => {
    expect(Object.keys(enUserMessage)).toEqual(Object.keys(vnUserMessage));
  });

  it('en/shopData.json and vn/shopData.json should have the same structure for hero.characteristics', () => {
    expect(Array.isArray(enShopData.hero.characteristics)).toBe(true);
    expect(Array.isArray(vnShopData.hero.characteristics)).toBe(true);
    expect(enShopData.hero.characteristics.length).toBe(
      vnShopData.hero.characteristics.length
    );
    enShopData.hero.characteristics.forEach((item, idx) => {
      expect(Object.keys(item)).toEqual(
        Object.keys(vnShopData.hero.characteristics[idx])
      );
    });
  });

  it('en/shopData.json and vn/shopData.json should have the same structure for footer.hyperlink', () => {
    expect(Array.isArray(enShopData.footer.hyperlink)).toBe(true);
    expect(Array.isArray(vnShopData.footer.hyperlink)).toBe(true);
    expect(enShopData.footer.hyperlink.length).toBe(
      vnShopData.footer.hyperlink.length
    );
    enShopData.footer.hyperlink.forEach((item, idx) => {
      expect(Object.keys(item)).toEqual(
        Object.keys(vnShopData.footer.hyperlink[idx])
      );
      expect(Array.isArray(item.links)).toBe(true);
      expect(Array.isArray(vnShopData.footer.hyperlink[idx].links)).toBe(true);
      expect(item.links.length).toBe(
        vnShopData.footer.hyperlink[idx].links.length
      );
      item.links.forEach((link, linkIdx) => {
        expect(Object.keys(link)).toEqual(
          Object.keys(vnShopData.footer.hyperlink[idx].links[linkIdx])
        );
      });
    });
  });

  it('en/shopData.json and vn/shopData.json should have the same number of policy items', () => {
    expect(Array.isArray(enShopData.policy)).toBe(true);
    expect(Array.isArray(vnShopData.policy)).toBe(true);
    expect(enShopData.policy.length).toBe(vnShopData.policy.length);
    enShopData.policy.forEach((item, idx) => {
      expect(Object.keys(item)).toEqual(Object.keys(vnShopData.policy[idx]));
    });
  });
});
