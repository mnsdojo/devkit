export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | JsonArray;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];

export function convertJsonToTypescript(
  json: JsonObject,
  rootName = "Root"
): string {
  const generatedInterfaces = new Set<string>();
  const lines: string[] = [];

  // Helper function to capitalize first letter
  const capitalize = (name: string): string =>
    name.charAt(0).toUpperCase() + name.slice(1);

  // Recursive type determination
  const getType = (value: JsonValue, nestedName: string): string => {
    if (value === null) return "null | undefined";
    if (typeof value === "string") return "string";
    if (typeof value === "number") return "number";
    if (typeof value === "boolean") return "boolean";

    if (Array.isArray(value)) {
      if (value.length === 0) return "any[]";

      // Find most specific array type
      const nonNullElement = value.find((item) => item !== null);
      const arrayType =
        nonNullElement !== undefined
          ? getType(nonNullElement, `${nestedName}Item`)
          : "any";

      return `${arrayType}[]`;
    }

    if (typeof value === "object" && value !== null) {
      // Recursively generate interfaces for nested objects
      parseObject(value as JsonObject, nestedName);
      return nestedName;
    }

    return "any";
  };

  // Object parsing function
  const parseObject = (obj: JsonObject, name: string) => {
    if (generatedInterfaces.has(name)) return;
    generatedInterfaces.add(name);

    lines.push(`interface ${name} {`);

    // Sort keys to ensure consistent output
    const sortedEntries = Object.entries(obj).sort((a, b) =>
      a[0].localeCompare(b[0])
    );

    for (const [key, value] of sortedEntries) {
      const isOptional = value === null || value === undefined;
      const tsType = getType(value, capitalize(key));

      // Add comments for keys to improve readability
      lines.push(`  /** ${key} property */`);
      lines.push(`  ${key}${isOptional ? "?" : ""}: ${tsType};`);
      lines.push(""); // Add an empty line between properties for better readability
    }

    lines.push("}");
    lines.push(""); // Add an extra newline between interfaces
  };

  // Start parsing the root object
  parseObject(json, rootName);

  return lines.join("\n").trim(); // Trim to remove extra whitespace at the end
}
