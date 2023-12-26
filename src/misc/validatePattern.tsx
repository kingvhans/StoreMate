export function validateExpiryDatePattern(str : string): boolean {
    const pattern: RegExp = /^\d{4}-(0[1-9]|1[0-2])$/;
    return pattern.test(str);
  }