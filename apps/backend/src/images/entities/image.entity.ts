import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'images' })
export class ImageEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 500, unique: true })
    key!: string;

    @Column({ type: 'varchar', length: 255 })
    fileName!: string;

    @Column({ type: 'varchar', length: 100 })
    contentType!: string;

    @Column({ type: 'integer' })
    size!: number;

}