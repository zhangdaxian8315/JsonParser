const {
  formatJsonWithInput,
  unformatJsonWithInput,
  escapeJsonWithInput,
  unescapeJsonWithInput,
  unicodeToChineseWithInput,
  chineseToUnicodeWithInput,
} = require('./jsonFunctions');

describe('formatJsonWithInput', () => {
  test('formats valid JSON string', () => {
    const input = '{"name": "John", "age": 30}';
    const expectedOutput = '{\n\t"name": "John",\n\t"age": 30\n}';

    expect(formatJsonWithInput(input)).toBe(expectedOutput);
  });

  test('throws error for invalid JSON string', () => {
    const input = '{"name": "John", "age": 30,}';

    expect(() => formatJsonWithInput(input)).toThrow();
  });

  test('formats JSON string with nested objects', () => {
    const input = '{"name": "John", "age": 30, "address": {"city": "New York", "country": "USA"}}';
    const expectedOutput = '{\n\t"name": "John",\n\t"age": 30,\n\t"address": {\n\t\t"city": "New York",\n\t\t"country": "USA"\n\t}\n}';

    expect(formatJsonWithInput(input)).toBe(expectedOutput);
  });

  test('formats JSON string with special characters', () => {
    const input = '{"text": "Hello \\"World\\"!"}';
    const expectedOutput = '{\n\t"text": "Hello \\"World\\"!"\n}';

    expect(formatJsonWithInput(input)).toBe(expectedOutput);
  });

  test('returns empty string for empty input', () => {
    const input = '';
    const expectedOutput = '';

    expect(formatJsonWithInput(input)).toBe(expectedOutput);
  });
});

describe('unformatJsonWithInput', () => {
  test('unformats valid JSON string', () => {
    const input = '{\n\t"name": "John",\n\t"age": 30\n}';
    const expectedOutput = '{"name":"John","age":30}';

    expect(unformatJsonWithInput(input)).toBe(expectedOutput);
  });

  test('throws error for invalid JSON string', () => {
    const input = '{\n\t"name": "John",\n\t"age": 30,\n}';

    expect(() => unformatJsonWithInput(input)).toThrow();
  });

  test('unformats JSON string with nested objects', () => {
    const input = '{\n\t"name": "John",\n\t"age": 30,\n\t"address": {\n\t\t"city": "New York",\n\t\t"country": "USA"\n\t}\n}';
    const expectedOutput = '{"name":"John","age":30,"address":{"city":"New York","country":"USA"}}';

    expect(unformatJsonWithInput(input)).toBe(expectedOutput);
  });

  test('unformats JSON string with special characters', () => {
    const input = '{\n\t"text": "Hello \\"World\\"!"\n}';
    const expectedOutput = '{"text":"Hello \\"World\\"!"}';

    expect(unformatJsonWithInput(input)).toBe(expectedOutput);
  });
});

describe('escapeJsonWithInput', () => {
  test('escapes special characters in JSON string', () => {
    const input = '{"text": "Hello \\"World\\"!"}';
    const expectedOutput = '{\\"text\\": \\"Hello \\\\\\"World\\\\\\"!\\"}';

    expect(escapeJsonWithInput(input)).toBe(expectedOutput);
  });

  test('returns empty string for empty input', () => {
    const input = '';
    const expectedOutput = '';

    expect(escapeJsonWithInput(input)).toBe(expectedOutput);
  });

  test('escapes JSON string without special characters', () => {
    const input = '{"name": "John", "age": 30}';
    const expectedOutput = '{\\"name\\": \\"John\\", \\"age\\": 30}';

    expect(escapeJsonWithInput(input)).toBe(expectedOutput);
  });
});

describe('unescapeJsonWithInput', () => {
  test('unescapes special characters in JSON string', () => {
    const input = '{\\"text\\": \\"Hello \\\\\\"World\\\\\\"!\\"}';
    const expectedOutput = '{"text": "Hello \\"World\\"!"}';

    expect(unescapeJsonWithInput(input)).toBe(expectedOutput);
  });

  test('returns empty string for empty input', () => {
    const input = '';
    const expectedOutput = '';

    expect(unescapeJsonWithInput(input)).toBe(expectedOutput);
  });

  test('unescapes JSON string without escaped special characters', () => {
    const input = '{"name": "John", "age": 30}';
    const expectedOutput = '{"name": "John", "age": 30}';

    expect(unescapeJsonWithInput(input)).toBe(expectedOutput);
  });
});

describe('unicodeToChineseWithInput', () => {
  test('converts Unicode to Chinese characters', () => {
    const input = '{"text": "\\u4F60\\u597D"}';
    const expectedOutput = '{"text": "你好"}';

    expect(unicodeToChineseWithInput(input)).toBe(expectedOutput);
  });

  test('returns empty string for empty input', () => {
    const input = '';
    const expectedOutput = '';

    expect(unicodeToChineseWithInput(input)).toBe(expectedOutput);
  });

  test('does not change JSON string without Unicode Chinese characters', () => {
    const input = '{"name": "John", "age": 30}';
    const expectedOutput = '{"name": "John", "age": 30}';

    expect(unicodeToChineseWithInput(input)).toBe(expectedOutput);
  });

  test('does not change JSON string with only Chinese characters', () => {
    const input = '{"text": "你好"}';
    const expectedOutput = '{"text": "你好"}';

    expect(unicodeToChineseWithInput(input)).toBe(expectedOutput);
  });
});

describe('chineseToUnicodeWithInput', () => {
  test('converts Chinese characters to Unicode', () => {
  const input = '{"text": "你好"}';
  const expectedOutput = '{"text": "\\u4f60\\u597d"}';

  expect(chineseToUnicodeWithInput(input)).toBe(expectedOutput);
});

  test('returns empty string for empty input', () => {
    const input = '';
    const expectedOutput = '';

    expect(chineseToUnicodeWithInput(input)).toBe(expectedOutput);
  });

  test('does not change JSON string without Chinese characters', () => {
    const input = '{"name": "John", "age": 30}';
    const expectedOutput = '{"name": "John", "age": 30}';

    expect(chineseToUnicodeWithInput(input)).toBe(expectedOutput);
  });

  test('converts JSON string with only Chinese characters to Unicode', () => {
    const input = '{"text": "你好"}';
    const expectedOutput = '{"text": "\\u4f60\\u597d"}';
  
    expect(chineseToUnicodeWithInput(input)).toBe(expectedOutput);
  });
});
