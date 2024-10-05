import { validateFieldAccordingToSchema } from "../src/util/formValidation";

const validationSchema = {
  testRegexp: {
    regexp: /[a-z]+/,
  },
  testMaxValue: {
    maxValue: 10,
  },
  testMaxLength: {
    maxLength: 5,
  },
  testMinLength: {
    minLength: 2,
  },
};
describe("form field", () => {
  it("is valid according to schema regexp", () => {
    const mockCallback = jest.fn((field, [key, val]: [string, any]) => {});
    const validate = validateFieldAccordingToSchema(validationSchema);
    const fieldName = "testRegexp";
    const fieldValue = "hello";

    const validated = validate(fieldName, fieldValue);
    expect(validated).toBe(true);
  });

  it("is invalid according to schema regexp", () => {
    const mockCallback = jest.fn((field, [key, val]: [string, any]) => {});
    const validate = validateFieldAccordingToSchema(validationSchema);
    const fieldName = "testRegexp";
    const fieldValue = "HELLO";

    const validated = validate(fieldName, fieldValue);
    expect(validated).toBe(false);
  });

  it("is valid according to schema max value", () => {
    const mockCallback = jest.fn((field, [key, val]: [string, any]) => {});
    const validate = validateFieldAccordingToSchema(validationSchema);
    const fieldName = "testMaxValue";
    const fieldValue = "10";

    const validated = validate(fieldName, fieldValue);
    expect(validated).toBe(true);
  });

  it("is invalid according to schema max value", () => {
    const mockCallback = jest.fn((field, [key, val]: [string, any]) => {});
    const validate = validateFieldAccordingToSchema(validationSchema);
    const fieldName = "testMaxValue";
    const fieldValue = "11";

    const validated = validate(fieldName, fieldValue);
    expect(validated).toBe(false);
  });

  it("is valid according to schema max length", () => {
    const mockCallback = jest.fn((field, [key, val]: [string, any]) => {});
    const validate = validateFieldAccordingToSchema(validationSchema);
    const fieldName = "testMaxLength";
    const fieldValue = "hello";

    const validated = validate(fieldName, fieldValue);
    expect(validated).toBe(true);
  });

  it("is invalid according to schema max length", () => {
    const mockCallback = jest.fn((field, [key, val]: [string, any]) => {});
    const validate = validateFieldAccordingToSchema(validationSchema);
    const fieldName = "testMaxLength";
    const fieldValue = "helloo";

    const validated = validate(fieldName, fieldValue);
    expect(validated).toBe(false);
  });

  it("is valid according to schema min length", () => {
    const mockCallback = jest.fn((field, [key, val]: [string, any]) => {});
    const validate = validateFieldAccordingToSchema(validationSchema);
    const fieldName = "testMinLength";
    const fieldValue = "hello";

    const validated = validate(fieldName, fieldValue);
    expect(validated).toBe(true);
  });

  it("is invalid according to schema min length", () => {
    const mockCallback = jest.fn((field, [key, val]: [string, any]) => {});
    const validate = validateFieldAccordingToSchema(validationSchema);
    const fieldName = "testMinLength";
    const fieldValue = "h";

    const validated = validate(fieldName, fieldValue);
    expect(validated).toBe(false);
  });
});
