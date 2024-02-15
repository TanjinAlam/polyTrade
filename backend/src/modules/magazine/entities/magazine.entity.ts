import { DefaultBaseEntity } from 'src/common/entities'
import { UserMagazineSubscription } from 'src/modules/user/entities/user-magazine-subscription.entity'

import { Column, Entity, OneToMany } from 'typeorm'
@Entity()
export class Magazine extends DefaultBaseEntity {
    @Column({ type: 'varchar', length: 30, nullable: true })
    name: string

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
        nullable: false
    })
    title: string

    @Column({
        type: 'varchar',
        length: 500,
        nullable: false
    })
    description: string

    @Column({
        type: 'int',
        default: 100
    })
    price: string

    @Column({
        type: 'varchar',
        length: 122,
        nullable: false
    })
    publisherName: string

    @Column({
        type: 'varchar',
        length: 122,
        nullable: false
    })
    imagePath: string

    @OneToMany(
        () => UserMagazineSubscription,
        (userMagazineSubscription) => userMagazineSubscription.magazine
    )
    userSubscriptions: UserMagazineSubscription[]
}
