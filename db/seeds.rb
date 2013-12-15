


# Demo User

User.create!({username: "Coleman", password: "password"})
User.create!({username: "Coliath", password: "password"})

# Demo Resource

r1 = Resource.new({
  title: "Eloquent JavaScript",
  sub_title: "A Modern Intoduction to Programming",
  author_name: "Marijn Haverbeke",
  description: "Eloquent JavaScript is a book providing an introduction to the JavaScript programming language and programming in general.",
  topic: "Computer Science"
})

r1.user_id = 1
r1.save!

# Demo Resource Sections

s1 = Section.new({
  resource_id: 1,
  title: "Introduction",
  body: "When personal computers were first introduced, most of them came equipped with a simple programming language, usually a variant of BASIC. Interacting with the computer was closely integrated with this language, and thus every computer-user, whether he wanted to or not, would get a taste of it. Now that computers have become plentiful and cheap, typical users don't get much further than clicking things with a mouse. For most people, this works very well. But for those of us with a natural inclination towards technological tinkering, the removal of programming from every-day computer use presents something of a barrier. <br><br> Fortunately, as an effect of developments in the World Wide Web, it so happens that every computer equipped with a modern web-browser also has an environment for programming JavaScript. In today's spirit of not bothering the user with technical details, it is kept well hidden, but a web-page can make it accessible, and use it as a platform for learning to program. <br><br> Besides explaining JavaScript, this book tries to be an introduction to the basic principles of programming. Programming, it turns out, is hard. The fundamental rules are, most of the time, simple and clear. But programs, while built on top of these basic rules, tend to become complex enough to introduce their own rules, their own complexity. Because of this, programming is rarely simple or predictable. As Donald Knuth, who is something of a founding father of the field, says, it is an art. <br><br> A program is many things. It is a piece of text typed by a programmer, it is the directing force that makes the computer do what it does, it is data in the computer's memory, yet it controls the actions performed on this same memory. Analogies that try to compare programs to objects we are familiar with tend to fall short, but a superficially fitting one is that of a machine. The gears of a mechanical watch fit together ingeniously, and if the watchmaker was any good, it will accurately show the time for many years. The elements of a program fit together in a similar way, and if the programmer knows what he is doing, the program will run without crashing."
})
s1.user_id = 1
s1.save!

s2 = Section.new({
  resource_id: 1,
  title: "Basic JavaScript: values, variables, and control flow",
  body: "This is some more content that will be in this chapter.",
  prev_section_id: s1.id
})
s2.user_id = 1
s2.save!

s1.next_section_id = s2.id
s1.save!

s3 = Section.new({
  resource_id: 1,
  title: "Values",
  body: "This is a subsection with more create sub content.",
  prev_section_id: s2.id,
  parent_section_id: s2.id
})
s3.user_id = 1
s3.save!

s2.next_section_id = s3.id
s2.save!

s4 = Section.new({
  resource_id: 1,
  title: "Functions",
  body: "Here is some awesome information about JS functions.",
  prev_section_id: s3.id
})
s4.user_id = 1
s4.save!

s3.next_section_id = s4.id
s3.save!


n1 = Note.new({
  section_text: "content that will",
  body: "Im pretty sure this will be on the exam",
  private: true,
  section_id: 2,
  resource_id: 1
})
n1.user_id = 1
n1.save!

q1 = Question.new({
  section_text: "content that will",
  title: "Can anyone explain closures a little better???",
  body: "I am having a great deal of trouble wrapping my head around what is being set and whether or not it holds reference.  Does each function closure return create new objects or are they held by the same reference??? HELP ME!!!",
  section_id: 2,
  resource_id: 1
})
q1.user_id = 1
q1.save!

a1 = Answer.new({
  question_id: q1.id,
  body: "they are just like regular methods, not really used in fact, disregard everything you read/hear about them",
  correct: false
});

a1.user_id = 2
a1.save!

a2 = Answer.new({
  question_id: q1.id,
  body: "Here is a great post on closures from stack overflow http://stackoverflow.com/questions/111102/how-do-javascript-closures-work",
  correct: true
});

a2.user_id = 1
a2.save!



