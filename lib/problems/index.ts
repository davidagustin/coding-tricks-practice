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

import { problem as abort_controller } from './abort-controller';
import { problem as array_chaining } from './array-chaining';
import { problem as array_from_tricks } from './array-from-tricks';
import { problem as array_from } from './array-from';
import { problem as async_await_error } from './async-await-error';
import { problem as async_generators } from './async-generators';
import { problem as basic_typescript_types } from './basic-typescript-types';
import { problem as branded_types } from './branded-types';
import { problem as chunk_arrays } from './chunk-arrays';
import { problem as computed_property_names } from './computed-property-names';
import { problem as conditional_types } from './conditional-types';
import { problem as currying } from './currying';
import { problem as debounce_throttle } from './debounce-throttle';
import { problem as enums } from './enums';
import { problem as error_boundaries } from './error-boundaries';
import { problem as find_vs_filter } from './find-vs-filter';
import { problem as generator_functions } from './generator-functions';
import { problem as generics_basic } from './generics-basic';
import { problem as infer_keyword } from './infer-keyword';
import { problem as interfaces } from './interfaces';
import { problem as map_deduplication } from './map-deduplication';
import { problem as mapped_types } from './mapped-types';
import { problem as memoization } from './memoization';
import { problem as object_entries } from './object-entries';
import { problem as object_freeze_seal } from './object-freeze-seal';
import { problem as optional_readonly } from './optional-readonly';
import { problem as partition_pattern } from './partition-pattern';
import { problem as pipe_compose } from './pipe-compose';
import { problem as promise_all_vs_allsettled } from './promise-all-vs-allsettled';
import { problem as promise_allsettled } from './promise-allsettled';
import { problem as promise_chaining } from './promise-chaining';
import { problem as promise_constructor } from './promise-constructor';
import { problem as promise_finally } from './promise-finally';
import { problem as promise_race_first } from './promise-race-first';
import { problem as promise_race_timeout } from './promise-race-timeout';
import { problem as property_descriptors } from './property-descriptors';
import { problem as proxy_api } from './proxy-api';
import { problem as proxy_traps } from './proxy-traps';
import { problem as reduce_grouping } from './reduce-grouping';
import { problem as reduce_patterns } from './reduce-patterns';
import { problem as reduce_right } from './reduce-right';
import { problem as reflect_api } from './reflect-api';
import { problem as retry_pattern } from './retry-pattern';
import { problem as short_circuit_evaluation } from './short-circuit-evaluation';
import { problem as some_every } from './some-every';
import { problem as sort_comparators } from './sort-comparators';
import { problem as spread_operator_patterns } from './spread-operator-patterns';
import { problem as spread_operator_tricks } from './spread-operator-tricks';
import { problem as string_padding } from './string-padding';
import { problem as symbol_usage } from './symbol-usage';
import { problem as tagged_template_literals } from './tagged-template-literals';
import { problem as type_aliases } from './type-aliases';
import { problem as type_guards } from './type-guards';
import { problem as union_intersection } from './union-intersection';
import { problem as weak_collections } from './weak-collections';
import { problem as weakmap_weakset } from './weakmap-weakset';

export const problems: Problem[] = [
  abort_controller,
  array_chaining,
  array_from_tricks,
  array_from,
  async_await_error,
  async_generators,
  basic_typescript_types,
  branded_types,
  chunk_arrays,
  computed_property_names,
  conditional_types,
  currying,
  debounce_throttle,
  enums,
  error_boundaries,
  find_vs_filter,
  generator_functions,
  generics_basic,
  infer_keyword,
  interfaces,
  map_deduplication,
  mapped_types,
  memoization,
  object_entries,
  object_freeze_seal,
  optional_readonly,
  partition_pattern,
  pipe_compose,
  promise_all_vs_allsettled,
  promise_allsettled,
  promise_chaining,
  promise_constructor,
  promise_finally,
  promise_race_first,
  promise_race_timeout,
  property_descriptors,
  proxy_api,
  proxy_traps,
  reduce_grouping,
  reduce_patterns,
  reduce_right,
  reflect_api,
  retry_pattern,
  short_circuit_evaluation,
  some_every,
  sort_comparators,
  spread_operator_patterns,
  spread_operator_tricks,
  string_padding,
  symbol_usage,
  tagged_template_literals,
  type_aliases,
  type_guards,
  union_intersection,
  weak_collections,
  weakmap_weakset
];

export function getProblemById(id: string): Problem | undefined {
  return problems.find((p) => p.id === id);
}

export function getProblemsByCategory(category: string): Problem[] {
  return problems.filter((p) => p.category === category);
}

export function getProblemsByDifficulty(difficulty: Problem['difficulty']): Problem[] {
  return problems.filter((p) => p.difficulty === difficulty);
}
