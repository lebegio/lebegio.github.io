import { Entity, PrimaryGeneratedColumn, Column, ManyToOne , JoinColumn, OneToMany, JoinTable} from 'typeorm';

@Entity()
export class Poll {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  is_active: boolean;

  @OneToMany(() => PollOption, (poll_option) => poll_option.poll)
  poll_options: PollOption[]
}

@Entity('poll_option')
export class PollOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  win: boolean;
  
  @ManyToOne(() => Poll, (poll)=>poll.poll_options)
  @JoinColumn({ name: 'poll_id' })
  poll: Poll
}