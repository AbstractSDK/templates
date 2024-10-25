import { defineConfig } from '@abstract-money/cli'
import { react, registry, vanilla } from '@abstract-money/cli/plugins'

export default defineConfig({
  out: 'app/_generated/generated-abstract',
  contracts: [
    {
      name: "{{app_name | snake_case}}",
      path: "../contracts/{{app_name | snake_case}}/schema/abstract",
      namespace: "{{project-name | kebab_case}}",
      version: "0.1.0",
      moduleType: "app",
    },
    //     {
    //       name: "{{adapter_name | snake_case}}",
    //       path: "../contracts/{{adapter_name | snake_case}}/schema/abstract",
    //       namespace: "{{project-name | kebab_case}}",
    //       version: "0.1.0",
    //       moduleType: "adapter",
    //     }
    //     {
    //       name: "{{standalone_name | snake_case}}",
    //       // standalone contracts don't use the abstract folder
    //       path: "../contracts/{{standalone_name | snake_case}}/schema",
    //       namespace: "{{project-name | kebab_case}}",
    //       version: "0.1.0",
    //     }
  ],
  plugins: [
    react({
      disableAbstractAppFor: ['cw20-base']
    }),
    vanilla({
      enableAbstractAppFor: [
        '{{app_name | snake_case}}',
        // '{{adapter_name | snake_case}}',
      ]
    }),
    registry({
      contracts: [{
        namespace: 'cw-plus',
        name: 'cw20-base',
        version: '1.0.1'
      }]
  })],
})
