import { z } from "zod";

export class Quidquid {
  private quidQuid: any;
  private parentObjectKey?: string;

  /**
   * Creates an instance of Quidquid.
   * @param {any} quidQuid - The source object from which fields will be extracted.
   * @param {string} [parentObjectKey] - The key of the parent object. Used for constructing full key paths in error messages.
   */
  private constructor(quidQuid: any, parentObjectKey?: string) {
    this.quidQuid = quidQuid;
    this.parentObjectKey = parentObjectKey;
  }

  /**
   * Constructs a new Quidquid instance from the provided source object.
   * @param {any} quidQuid - The source object from which fields will be extracted.
   * @returns {Quidquid} A new instance of the Quidquid class initialized with the provided source object.
   */
  public static from(quidQuid: any): Quidquid {
    return new Quidquid(quidQuid);
  }

  /**
   * Constructs the full key name for nested fields.
   * @param {string} key - The key to append to the parent key.
   * @returns {string} The full key name.
   */
  private pickFullkeyName(key: string): string {
    if (!this.parentObjectKey) return key;
    const fullKeyName = `${this.parentObjectKey}.${key}`;
    return fullKeyName;
  }

  /**
   * Extracts and validates a string field.
   * @param {string} key - The key of the field to extract.
   * @returns {Promise<string>} A promise that resolves to the extracted string.
   * @throws Will throw an error if the field is empty or not a string.
   */
  public async pickString(key: string): Promise<string> {
    const value = this.quidQuid[key] as string;
    const fullKeyName = this.pickFullkeyName(key);
    if (!value) throw new Error(`${fullKeyName} must not be empty`);
    const parseFailure = !(await z.string().safeParseAsync(value)).success;
    if (parseFailure) throw new Error(`${fullKeyName} must be a string`);
    return value;
  }

  /**
   * Extracts and validates an optional string field.
   * @param {string} key - The key of the field to extract.
   * @returns {Promise<string | undefined>} A promise that resolves to the extracted string or undefined if the field is empty.
   */
  public async pickStringOptional(key: string): Promise<string | undefined> {
    const value = this.quidQuid[key] as string;
    if (!value) return undefined;
    return this.pickString(key);
  }

  /**
   * Extracts and validates an array of strings.
   * @param {string} [key] - The key of the field to extract. If not provided, the source object itself is expected to be an array of strings.
   * @returns {Promise<string[]>} A promise that resolves to the extracted array of strings.
   * @throws Will throw an error if the field is empty or not an array of strings.
   */
  public async pickStringArray(key?: string): Promise<string[]> {
    let value: string[];
    if (!key) {
      value = this.quidQuid as string[];
      if (value == undefined) throw new Error("body must not be empty");
      const parseFailure = !(await z.array(z.string()).safeParseAsync(value))
        .success;
      if (parseFailure) throw new Error("body must be an array of strings");
      return value;
    }
    const fullKeyName = this.pickFullkeyName(key as string);
    value = this.quidQuid[key] as string[];
    if (value == undefined) throw new Error(`${fullKeyName} must not be empty`);
    const parseFailure = !(await z.array(z.string()).safeParseAsync(value))
      .success;
    if (parseFailure)
      throw new Error(`${fullKeyName} must be an array of strings`);
    return value;
  }

  /**
   * Extracts and validates an optional array of strings.
   * @param {string} key - The key of the field to extract.
   * @returns {Promise<string[] | undefined>} A promise that resolves to the extracted array of strings or undefined if the field is empty.
   */
  public async pickStringArrayOptional(
    key: string
  ): Promise<string[] | undefined> {
    const value = this.quidQuid[key] as string[];
    if (value == undefined) return undefined;
    return this.pickStringArray(key);
  }

  /**
   * Extracts and validates a number field.
   * @param {string} key - The key of the field to extract.
   * @returns {Promise<number>} A promise that resolves to the extracted number.
   * @throws Will throw an error if the field is empty or not a number.
   */
  public async pickNumber(key: string): Promise<number> {
    const fullKeyName = this.pickFullkeyName(key);
    const value = this.quidQuid[key] as number;
    if (value == undefined) throw new Error(`${fullKeyName} must not be empty`);
    const parseFailure = !(await z.number().safeParseAsync(value)).success;
    if (parseFailure) throw new Error(`${fullKeyName} must be a number`);
    return value;
  }

  /**
   * Extracts and validates an optional number field.
   * @param {string} key - The key of the field to extract.
   * @returns {Promise<number | undefined>} A promise that resolves to the extracted number or undefined if the field is empty.
   */
  public async pickNumberOptional(key: string): Promise<number | undefined> {
    const value = this.quidQuid[key] as number;
    if (value == undefined) return undefined;
    return this.pickNumber(key);
  }

  /**
   * Extracts and validates an array of numbers.
   * @param {string} [key] - The key of the field to extract. If not provided, the source object itself is expected to be an array of numbers.
   * @returns {Promise<number[]>} A promise that resolves to the extracted array of numbers.
   * @throws Will throw an error if the field is empty or not an array of numbers.
   */
  public async pickNumberArray(key?: string): Promise<number[]> {
    let value: number[];
    if (!key) {
      value = this.quidQuid as number[];
      if (value == undefined) throw new Error("body must not be empty");
      const parseFailure = !(await z.array(z.number()).safeParseAsync(value))
        .success;
      if (parseFailure) throw new Error("body must be an array of numbers");
      return value;
    }
    value = this.quidQuid[key] as number[];
    const fullKeyName = this.pickFullkeyName(key);
    if (value == undefined) throw new Error(`${fullKeyName} must not be empty`);
    const parseFailure = !(await z.array(z.number()).safeParseAsync(value))
      .success;
    if (parseFailure)
      throw new Error(`${fullKeyName} must be an array of numbers`);
    return value;
  }

  /**
   * Extracts and validates an optional array of numbers.
   * @param {string} key - The key of the field to extract.
   * @returns {Promise<number[] | undefined>} A promise that resolves to the extracted array of numbers or undefined if the field is empty.
   */
  public async pickNumberArrayOptional(
    key: string
  ): Promise<number[] | undefined> {
    const value = this.quidQuid[key];
    if (value == undefined) return undefined;
    return this.pickNumberArray(key);
  }

  /**
   * Extracts and validates a boolean field.
   * @param {string} key - The key of the field to extract.
   * @returns {Promise<boolean>} A promise that resolves to the extracted boolean.
   * @throws Will throw an error if the field is empty or not a boolean.
   */
  public async pickBoolean(key: string): Promise<boolean> {
    const fullKeyName = this.pickFullkeyName(key);
    const value = this.quidQuid[key] as boolean;
    if (value == undefined) throw new Error(`${fullKeyName} must not be empty`);
    const parseFailure = !(await z.boolean().safeParseAsync(value)).success;
    if (parseFailure) throw new Error(`${fullKeyName} must be a boolean`);
    return value;
  }

  /**
   * Extracts and validates an optional boolean field.
   * @param {string} key - The key of the field to extract.
   * @returns {Promise<boolean | undefined>} A promise that resolves to the extracted boolean or undefined if the field is empty.
   */
  public async pickBooleanOptional(key: string): Promise<boolean | undefined> {
    const value = this.quidQuid[key] as boolean;
    if (value == undefined) return undefined;
    return this.pickBoolean(key);
  }

  /**
   * Extracts and validates a nested object field, returning a new Quidquid instance.
   * @param {string} key - The key of the field to extract.
   * @returns {Promise<Quidquid>} A promise that resolves to a new Quidquid instance containing
   * */
  public async pickObject(key: string): Promise<Quidquid> {
    const fullKeyName = this.pickFullkeyName(key);
    const value = this.quidQuid[key] as any;
    if (value == undefined) throw new Error(`${fullKeyName} must not be empty`);
    const parseFailure = !(await z.object({}).safeParseAsync(value)).success;
    if (parseFailure) throw new Error(`${fullKeyName} must be an object`);
    return new Quidquid(value, key);
  }

  /**
   * Extracts and validates an optional nested object field, returning a new Quidquid instance if the field is present.
   * @param {string} key - The key of the field to extract.
   * @returns {Promise<Quidquid | undefined>} A promise that resolves to a new Quidquid instance or undefined if the field is empty.
   */
  public async pickObjectOptional(key: string): Promise<Quidquid | undefined> {
    const value = this.quidQuid[key] as any;
    if (value == undefined) return undefined;
    return this.pickObject(key);
  }

  /**
   * Extracts and validates an array of objects, returning an array of Quidquid instances.
   * @param {string} [key] - The key of the field to extract. If not provided, the source object itself is expected to be an array of objects.
   * @returns {Promise<Quidquid[]>} A promise that resolves to an array of Quidquid instances.
   * @throws Will throw an error if the field is empty or not an array of objects.
   */
  public async pickObjectArray(key?: string): Promise<Quidquid[]> {
    let value: Quidquid[];
    if (!key) {
      value = this.quidQuid as Quidquid[];
      if (value == undefined) throw new Error("body must not be empty");
      const parseFailure = !(await z.array(z.object({})).safeParseAsync(value))
        .success;
      if (parseFailure) throw new Error("body must be an array of objects");
      return value.map((quidQuid) => new Quidquid(quidQuid));
    }
    const fullKeyName = this.pickFullkeyName(key);
    value = this.quidQuid[key] as Quidquid[];
    if (value == undefined) throw new Error(`${fullKeyName} must not be empty`);
    const parseFailure = !(await z.array(z.object({})).safeParseAsync(value))
      .success;
    if (parseFailure)
      throw new Error(`${fullKeyName} must be an array of objects`);
    return value.map((quidQuid) => new Quidquid(quidQuid));
  }

  /**
   * Extracts and validates an optional array of objects, returning an array of Quidquid instances if the field is present.
   * @param {string} key - The key of the field to extract.
   * @returns {Promise<Quidquid[] | undefined>} A promise that resolves to an array of Quidquid instances or undefined if the field is empty.
   */
  public async pickObjectArrayOptional(
    key: string
  ): Promise<Quidquid[] | undefined> {
    const value = this.quidQuid[key] as Quidquid[];
    if (value == undefined) return undefined;
    return this.pickObjectArray(key);
  }
}
