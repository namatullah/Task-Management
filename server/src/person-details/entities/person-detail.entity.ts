import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PersonDetail {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  fatherName: string;

  @Column()
  gender: string;

  @Column()
  age: Number;
}
