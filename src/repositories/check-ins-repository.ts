import { CheckIn, Prisma } from '@prisma/client'

export interface CheckinsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findById(id: string): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  save(checkIn: CheckIn): Promise<CheckIn>
}
