import { DefaultBaseEntity } from 'src/common/entities'

import { SubscriptionType } from 'src/common/enums'
import { Magazine } from 'src/modules/magazine/entities/magazine.entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { User } from './user.entity'
@Entity()
export class UserMagazineSubscription extends DefaultBaseEntity {
    @ManyToOne(() => User, (user) => user.magazineSubscriptions)
    user: User

    @ManyToOne(() => Magazine, (magazine) => magazine.userSubscriptions)
    magazine: Magazine

    @Column({
        type: 'boolean',
        default: true
    })
    status: boolean

    @Column({
        type: 'enum',
        enum: SubscriptionType,
        nullable: false,
        default: SubscriptionType.Month
    })
    subscriptionType: SubscriptionType
}
