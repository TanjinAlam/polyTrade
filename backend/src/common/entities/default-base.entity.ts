import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Generated,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

export class DefaultBaseEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ unique: true })
    @Generated('uuid')
    uuid: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
