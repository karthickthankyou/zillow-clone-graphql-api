import type { CodegenConfig } from '@graphql-codegen/cli'
import { join } from 'path'

const config: CodegenConfig = {
  overwrite: true,
  schema: join(process.cwd(), 'src/schema.gql'),
  watch: true,
  generates: {
    'prisma/seed/generated/': {
      documents: join(process.cwd(), 'prisma/**/*.gql.tsx'),
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
