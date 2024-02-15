import * as bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'
import { IsEmail, IsString } from 'class-validator'
import { DefaultBaseEntity } from 'src/common/entities'
import { UserType } from 'src/common/enums'

import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm'
import { UserMagazineSubscription } from './user-magazine-subscription.entity'
@Entity()
export class User extends DefaultBaseEntity {
    @Column({ type: 'varchar', length: 30, nullable: true })
    name: string

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false
    })
    @IsEmail()
    email: string

    @Column({
        type: 'enum',
        enum: UserType,
        nullable: false,
        default: UserType.User
    })
    userType: UserType

    @Exclude()
    @Column({ type: 'varchar', length: 255, nullable: false })
    @IsString()
    password: string

    @OneToMany(
        () => UserMagazineSubscription,
        (userMagazineSubscription) => userMagazineSubscription.user
    )
    magazineSubscriptions: UserMagazineSubscription[]

    @BeforeInsert()
    async hashPassword() {
        if (this.password) this.password = await bcrypt.hash(this.password, 10)
    }

    /**
     * CONSTRUCTOR
     */
    constructor(
        name: string,
        email: string,
        password: string,
        userType: UserType
    ) {
        super()
        this.name = name
        this.password = password
        this.email = email
        this.userType = userType
    }
}
