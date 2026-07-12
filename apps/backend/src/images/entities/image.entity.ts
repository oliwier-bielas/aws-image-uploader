import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'images' })
export class Image {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 500, unique: true })
    key!: string;

    @Column({ type: 'varchar', length: 255 })
    originalName!: string;
}