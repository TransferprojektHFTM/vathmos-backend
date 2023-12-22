# NestJS complexities

NestJS, and its components, such as its ORM, may make things easier for many things,
but it does come with its quirks. 

## TypeORM, cascading and eager loading

Let's say you just met this one exception: `Cannot query across many-to-many for property persons`
or you got a list on a many-to-many relationship that stays empty no matter how many 
times you run `update()`.

Let's take this many-to-many relationship:
```
  @ManyToMany(() => Person, person=> person.classes)
  @JoinTable({
    name: 'student_class_person',
    joinColumn: { name: 'student_class_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'person_id', referencedColumnName: 'id' },
  })
  persons: Person[];
```

First and foremost; `Repository.update()`, unlike `save()` is very efficient yet simple; 
it doesn't care about any relationship, cascading whatsoever.
So unless you are willing to use a QueryBuilder, just use save(),
for `save()` will explicitely take care of all those funky relationship and 
cascading issues itself.

Second, all lists such as `persons` are lazy-loaded by default.
Which means that if you try to `save()` an object whose list is empty, because you forgot to fetch it first,
then it will interpret this as you wanting to CLEAR the whole list, and thus delete all your related
entries in your intermediate table. 

Finally, a `cascade` property has to be set on your `@ManyToMany` relationship, 
for if you want typeorm to automatically save the persons entities, you have set cascade to true.
If you delete entries from this list, and you save, then those entries will be cleared from the 
intermediate table, same for updating, or insert data ofc.