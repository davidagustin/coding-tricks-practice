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
import { problem as array_from } from './array-from';
import { problem as array_from_tricks } from './array-from-tricks';
import { problem as async_await_error } from './async-await-error';
import { problem as async_generators } from './async-generators';
import { problem as async_iteration } from './async-iteration';
import { problem as async_mutex } from './async-mutex';
import { problem as basic_typescript_types } from './basic-typescript-types';
import { problem as branded_types } from './branded-types';
import { problem as chunk_arrays } from './chunk-arrays';
import { problem as closures_advanced } from './closures-advanced';
import { problem as computed_property_names } from './computed-property-names';
import { problem as conditional_types } from './conditional-types';
import { problem as currying } from './currying';
import { problem as debounce_throttle } from './debounce-throttle';
import { problem as enums } from './enums';
import { problem as error_boundaries } from './error-boundaries';
import { problem as event_loop } from './event-loop';
import { problem as find_vs_filter } from './find-vs-filter';
import { problem as generator_functions } from './generator-functions';
import { problem as generics_basic } from './generics-basic';
import { problem as infer_keyword } from './infer-keyword';
import { problem as interfaces } from './interfaces';
import { problem as map_deduplication } from './map-deduplication';
import { problem as mapped_types } from './mapped-types';
import { problem as memoization } from './memoization';
import { problem as memory_management } from './memory-management';
import { problem as object_assign_deep } from './object-assign-deep';
import { problem as object_entries } from './object-entries';
import { problem as object_freeze_seal } from './object-freeze-seal';
import { problem as object_fromentries } from './object-fromentries';
import { problem as object_getownpropertynames } from './object-getownpropertynames';
import { problem as object_groupby } from './object-groupby';
import { problem as object_hasown } from './object-hasown';
import { problem as optional_readonly } from './optional-readonly';
import { problem as partition_pattern } from './partition-pattern';
import { problem as pipe_compose } from './pipe-compose';
import { problem as promise_all_vs_allsettled } from './promise-all-vs-allsettled';
import { problem as promise_allsettled } from './promise-allsettled';
import { problem as promise_any } from './promise-any';
import { problem as promise_chaining } from './promise-chaining';
import { problem as promise_constructor } from './promise-constructor';
import { problem as promise_deferred } from './promise-deferred';
import { problem as promise_finally } from './promise-finally';
import { problem as promise_queue } from './promise-queue';
import { problem as promise_race_first } from './promise-race-first';
import { problem as promise_race_timeout } from './promise-race-timeout';
import { problem as property_descriptors } from './property-descriptors';
import { problem as prototype_chain } from './prototype-chain';
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
import { problem as string_normalize_unicode } from './string-normalize-unicode';
import { problem as string_padding } from './string-padding';
import { problem as string_replace_replaceall } from './string-replace-replaceall';
import { problem as string_slice_substring } from './string-slice-substring';
import { problem as string_template_tricks } from './string-template-tricks';
import { problem as symbol_usage } from './symbol-usage';
import { problem as tagged_template_literals } from './tagged-template-literals';
import { problem as type_aliases } from './type-aliases';
import { problem as type_assertions } from './type-assertions';
import { problem as type_guards } from './type-guards';
import { problem as type_narrowing } from './type-narrowing';
import { problem as union_intersection } from './union-intersection';
import { problem as utility_types_basic } from './utility-types-basic';
import { problem as keyof_typeof } from './keyof-typeof';
import { problem as function_overloads } from './function-overloads';
import { problem as weak_collections } from './weak-collections';
import { problem as weakmap_weakset } from './weakmap-weakset';

// JavaScript Basics (new)
import { problem as destructuring_patterns } from './destructuring-patterns';
import { problem as nullish_coalescing } from './nullish-coalescing';
import { problem as optional_chaining } from './optional-chaining';
import { problem as rest_parameters } from './rest-parameters';

// Functional Programming (new)
import { problem as pure_functions } from './pure-functions';
import { problem as immutability_patterns } from './immutability-patterns';
import { problem as function_composition } from './function-composition';
import { problem as monads_basics } from './monads-basics';

// TypeScript Advanced (new)
import { problem as template_literal_types } from './template-literal-types';
import { problem as discriminated_unions } from './discriminated-unions';
import { problem as recursive_types } from './recursive-types';
import { problem as type_challenges } from './type-challenges';

// Array Methods (new)
import { problem as array_flat_flatmap } from './array-flat-flatmap';
import { problem as array_at_method } from './array-at-method';
import { problem as array_findlast_findlastindex } from './array-findlast-findlastindex';
import { problem as array_toSorted_toReversed } from './array-toSorted-toReversed';
import { problem as array_intersection_difference } from './array-intersection-difference';

// Algorithms
import { problem as binary_search } from './binary-search';
import { problem as breadth_first_search } from './breadth-first-search';
import { problem as depth_first_search } from './depth-first-search';
import { problem as merge_sort } from './merge-sort';
import { problem as quick_sort } from './quick-sort';

// DOM/Browser
import { problem as custom_events } from './custom-events';
import { problem as event_delegation } from './event-delegation';
import { problem as intersection_observer } from './intersection-observer';
import { problem as local_session_storage } from './local-session-storage';
import { problem as mutation_observer } from './mutation-observer';

// Data Structures
import { problem as binary_search_tree } from './binary-search-tree';
import { problem as hash_table } from './hash-table';
import { problem as linked_list } from './linked-list';
import { problem as queue_implementation } from './queue-implementation';
import { problem as stack_implementation } from './stack-implementation';

// Regular Expressions
import { problem as regex_basics } from './regex-basics';
import { problem as regex_groups } from './regex-groups';
import { problem as regex_lookahead_lookbehind } from './regex-lookahead-lookbehind';
import { problem as regex_validation } from './regex-validation';
import { problem as regex_replace_patterns } from './regex-replace-patterns';

// Error Handling
import { problem as try_catch_patterns } from './try-catch-patterns';
import { problem as custom_errors } from './custom-errors';
import { problem as async_error_handling } from './async-error-handling';
import { problem as error_boundaries_pattern } from './error-boundaries-pattern';
import { problem as graceful_degradation } from './graceful-degradation';

// Design Patterns
import { problem as singleton_pattern } from './singleton-pattern';
import { problem as factory_pattern } from './factory-pattern';
import { problem as observer_pattern } from './observer-pattern';
import { problem as decorator_pattern } from './decorator-pattern';
import { problem as strategy_pattern } from './strategy-pattern';

// Testing Patterns
import { problem as mock_functions } from './mock-functions';
import { problem as test_doubles } from './test-doubles';
import { problem as async_testing } from './async-testing';
import { problem as test_driven_development } from './test-driven-development';
import { problem as property_based_testing } from './property-based-testing';

// Performance
import { problem as big_o_analysis } from './big-o-analysis';
import { problem as lazy_evaluation } from './lazy-evaluation';
import { problem as batch_processing } from './batch-processing';
import { problem as caching_strategies } from './caching-strategies';
import { problem as web_workers } from './web-workers';

// ES6+ Features
import { problem as iterators_iterables } from './iterators-iterables';
import { problem as private_class_fields } from './private-class-fields';
import { problem as static_blocks } from './static-blocks';
import { problem as top_level_await } from './top-level-await';
import { problem as logical_assignment } from './logical-assignment';

// Numbers & Math
import { problem as number_methods } from './number-methods';
import { problem as math_object } from './math-object';
import { problem as bigint_usage } from './bigint-usage';
import { problem as floating_point } from './floating-point';
import { problem as number_formatting } from './number-formatting';

// Date & Time
import { problem as date_basics } from './date-basics';
import { problem as date_arithmetic } from './date-arithmetic';
import { problem as date_formatting } from './date-formatting';
import { problem as timezone_handling } from './timezone-handling';
import { problem as temporal_api } from './temporal-api';

// JSON & Serialization
import { problem as json_parse_stringify } from './json-parse-stringify';
import { problem as json_replacer_reviver } from './json-replacer-reviver';
import { problem as circular_references } from './circular-references';
import { problem as deep_clone_json } from './deep-clone-json';
import { problem as custom_serialization } from './custom-serialization';

export const problems: Problem[] = [
  abort_controller,
  array_chaining,
  array_from_tricks,
  array_from,
  async_await_error,
  async_generators,
  async_iteration,
  async_mutex,
  basic_typescript_types,
  branded_types,
  chunk_arrays,
  closures_advanced,
  computed_property_names,
  conditional_types,
  currying,
  debounce_throttle,
  enums,
  error_boundaries,
  event_loop,
  find_vs_filter,
  generator_functions,
  generics_basic,
  infer_keyword,
  interfaces,
  map_deduplication,
  mapped_types,
  memoization,
  memory_management,
  object_assign_deep,
  object_entries,
  object_freeze_seal,
  object_fromentries,
  object_getownpropertynames,
  object_groupby,
  object_hasown,
  optional_readonly,
  partition_pattern,
  pipe_compose,
  promise_all_vs_allsettled,
  promise_allsettled,
  promise_any,
  promise_chaining,
  promise_constructor,
  promise_deferred,
  promise_finally,
  promise_queue,
  promise_race_first,
  promise_race_timeout,
  property_descriptors,
  prototype_chain,
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
  string_normalize_unicode,
  string_padding,
  string_replace_replaceall,
  string_slice_substring,
  string_template_tricks,
  symbol_usage,
  tagged_template_literals,
  type_aliases,
  type_assertions,
  type_guards,
  type_narrowing,
  union_intersection,
  utility_types_basic,
  keyof_typeof,
  function_overloads,
  weak_collections,
  weakmap_weakset,
  // Algorithms
  binary_search,
  breadth_first_search,
  depth_first_search,
  merge_sort,
  quick_sort,
  // DOM/Browser
  custom_events,
  event_delegation,
  intersection_observer,
  local_session_storage,
  mutation_observer,
  // Data Structures
  binary_search_tree,
  hash_table,
  linked_list,
  queue_implementation,
  stack_implementation,
  // Regular Expressions
  regex_basics,
  regex_groups,
  regex_lookahead_lookbehind,
  regex_validation,
  regex_replace_patterns,
  // JavaScript Basics (new)
  destructuring_patterns,
  nullish_coalescing,
  optional_chaining,
  rest_parameters,
  // Functional Programming (new)
  pure_functions,
  immutability_patterns,
  function_composition,
  monads_basics,
  // TypeScript Advanced (new)
  template_literal_types,
  discriminated_unions,
  recursive_types,
  type_challenges,
  // Array Methods (new)
  array_flat_flatmap,
  array_at_method,
  array_findlast_findlastindex,
  array_toSorted_toReversed,
  array_intersection_difference,
  // Error Handling
  try_catch_patterns,
  custom_errors,
  async_error_handling,
  error_boundaries_pattern,
  graceful_degradation,
  // Design Patterns
  singleton_pattern,
  factory_pattern,
  observer_pattern,
  decorator_pattern,
  strategy_pattern,
  // Testing Patterns
  mock_functions,
  test_doubles,
  async_testing,
  test_driven_development,
  property_based_testing,
  // Performance
  big_o_analysis,
  lazy_evaluation,
  batch_processing,
  caching_strategies,
  web_workers,
  // ES6+ Features
  iterators_iterables,
  private_class_fields,
  static_blocks,
  top_level_await,
  logical_assignment,
  // Numbers & Math
  number_methods,
  math_object,
  bigint_usage,
  floating_point,
  number_formatting,
  // Date & Time
  date_basics,
  date_arithmetic,
  date_formatting,
  timezone_handling,
  temporal_api,
  // JSON & Serialization
  json_parse_stringify,
  json_replacer_reviver,
  circular_references,
  deep_clone_json,
  custom_serialization,
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
