import { createParameterDecorator, ResolverData } from 'type-graphql'
import { GraphQLContext } from '../context'
import { UserModel } from '../../models/user.model'
import { prisma } from '../../config/prisma'

export const GqlUser = () => {
  return createParameterDecorator(
    async ({ context }: ResolverData<GraphQLContext>): Promise<UserModel | null> => {
      if (!context || !context.user) return null

      try {
        const user = await prisma.user.findUnique({
          where: {
            id: context.user,
          },
        })
        if (!user) throw new Error('Usuário não encontrado')
        return user
      } catch (error) {
        console.log('Error ao instanciar o gqluser')
        return null
      }
    }
  )
}