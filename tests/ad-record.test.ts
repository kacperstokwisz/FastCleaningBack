import { AdRecord } from "../records/ad.record";

const defaultObj = {
  name: "Test Name",
  description: "blah",
  url: "https://megak.pl",
  price: 0,
  lat: 9,
  lon: 9,
};

test("Can build AdRecord", () => {
  const ad = new AdRecord(defaultObj);

  expect(ad.name).toBe("Test Name");
  expect(ad.description).toBe("blah");
});

test("Validates invalid price", () => {
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        price: -3,
      })
  ).toThrow("Cena nie może być mniejsza niż 0 lub większa niż 9 999 999.");
});

test("Validates too short name", () => {
  expect(() => {
    new AdRecord({
      ...defaultObj,
      name: "",
    });
  }).toThrow(
    "Nazwa musi zawierać przynajmniej jeden znak. Maksymalnie 100 znaków."
  );
});

test("Validates too long name", () => {
  expect(() => {
    new AdRecord({
      ...defaultObj,
      name: "a".repeat(101),
    });
  }).toThrow(
    "Nazwa musi zawierać przynajmniej jeden znak. Maksymalnie 100 znaków."
  );
});

test("Validates too short description", () => {
  expect(() => {
    new AdRecord({
      ...defaultObj,
      description: "",
    });
  }).toThrow(
    "Opis musi zawierać przynajmniej jeden znak. Maksymalnie 1000 znaków."
  );
});

test("Validates too short description", () => {
  expect(() => {
    new AdRecord({
      ...defaultObj,
      description: "a".repeat(1001),
    });
  }).toThrow(
    "Opis musi zawierać przynajmniej jeden znak. Maksymalnie 1000 znaków."
  );
});

test("Validates lat type", () => {
  expect(() => {
    new AdRecord({
      ...defaultObj,
      lat: null,
    });
  }).toThrow("Nie można zlokalizować ogłoszenia.");
});

test("Validates lon type", () => {
  expect(() => {
    new AdRecord({
      ...defaultObj,
      lat: null,
    });
  }).toThrow("Nie można zlokalizować ogłoszenia.");
});
