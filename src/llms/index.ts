import type { PackageRuleItem } from '../rules';
import { LARAVELGPT_CORE_CONTENT, LARAVELGPT_RULES_VERSION } from '../laravelgpt-rules.js';

const processedRuleContent = LARAVELGPT_CORE_CONTENT.replace(
  '${LARAVELGPT_RULES_VERSION}',
  LARAVELGPT_RULES_VERSION
);

const rules: PackageRuleItem[] = [
  {
    name: 'laravelgpt-rule',
    description: 'LaravelGPT',
    rule: processedRuleContent,
    alwaysApply: true,
    globs: ['*', '**/*'],
  },
];

export default rules;
