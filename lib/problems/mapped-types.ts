export interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  starterCode: string;
  solution: string;
  testCases: Array<{
    input: unknown;
    expectedOutput: unknown;
    description?: string;
  }>;
  hints: string[];
}

export const problem: Problem = {
  id: 'mapped-types',
  title: 'TypeScript Mapped Types',
  difficulty: 'hard',
  category: 'TypeScript Advanced',
  description: `## In-Depth Explanation

Mapped types transform existing types by iterating over their properties and applying transformations. The syntax \`[K in keyof T]: Transformation\` creates a new type by mapping over each key in \`T\`.

Key modifiers:
- **?**: Makes property optional (\`Partial<T>\`)
- **-?**: Removes optional modifier (\`Required<T>\`)
- **readonly**: Makes property readonly (\`Readonly<T>\`)
- **-readonly**: Removes readonly modifier

This enables creating utility types like:
- \`Partial<T>\`: All properties optional
- \`Required<T>\`: All properties required
- \`Readonly<T>\`: All properties readonly
- \`Pick<T, K>\`: Select specific properties
- \`Omit<T, K>\`: Exclude specific properties

## Importance

Mapped types are essential for TypeScript type manipulation because:

- **Type Transformation**: Transform types programmatically
- **Utility Types**: Create reusable utility types
- **DRY Principle**: Avoid duplicating type definitions
- **Type Safety**: Maintain type safety while transforming
- **Framework Development**: Essential for building type-safe frameworks
- **API Design**: Create flexible, type-safe APIs

## Usefulness & Practical Applications

Mapped types are used extensively:

- **Utility Types**: Creating Partial, Required, Readonly, Pick, Omit
- **API Types**: Transforming API request/response types
- **Form Types**: Creating form types from data types
- **State Management**: Transforming state types
- **Component Props**: Transforming component prop types
- **Database Types**: Transforming database model types
- **Configuration Types**: Creating configuration types from schemas
- **Library Development**: Building type-safe libraries

**Challenge:** Create utility types using mapped type syntax.`,
  examples: [
    {
      input: `type Partial<T> = { [K in keyof T]?: T[K] }`,
      output: `All properties become optional`,
      explanation: 'Map over keys and add ? modifier',
    },
  ],
  starterCode: `// TODO: Create MyPartial - make all properties optional
type MyPartial<T> = T; // Fix this

// TODO: Create MyRequired - make all properties required
type MyRequired<T> = T; // Fix this

// TODO: Create MyReadonly - make all properties readonly
type MyReadonly<T> = T; // Fix this

// TODO: Create Nullable - make all properties nullable
type Nullable<T> = T; // Fix this

// Test types
interface User {
  name: string;
  age: number;
  email?: string;
}

type PartialUser = MyPartial<User>;
type RequiredUser = MyRequired<User>;
type ReadonlyUser = MyReadonly<User>;
type NullableUser = Nullable<User>;

// Test
const partialUser: PartialUser = { name: 'John' };
const requiredUser: RequiredUser = { name: 'John', age: 30, email: 'john@example.com' };`,
  solution: `type MyPartial<T> = { [K in keyof T]?: T[K] };

type MyRequired<T> = { [K in keyof T]-?: T[K] };

type MyReadonly<T> = { readonly [K in keyof T]: T[K] };

type Nullable<T> = { [K in keyof T]: T[K] | null };`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Type checking only',
    },
  ],
  hints: [
    '[K in keyof T] iterates over all keys',
    '? adds optional, -? removes optional',
    'readonly adds readonly modifier',
  ],
};
