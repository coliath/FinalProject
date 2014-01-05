


# Demo User

User.create!({username: "Demo", password: "password"})
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
  body: "<p>When personal computers were first introduced, most of them came equipped with a simple programming language, usually a variant of BASIC. Interacting with the computer was closely integrated with this language, and thus every computer-user, whether he wanted to or not, would get a taste of it. Now that computers have become plentiful and cheap, typical users don't get much further than clicking things with a mouse. For most people, this works very well. But for those of us with a natural inclination towards technological tinkering, the removal of programming from every-day computer use presents something of a barrier. </p><p> Fortunately, as an effect of developments in the World Wide Web, it so happens that every computer equipped with a modern web-browser also has an environment for programming JavaScript. In today's spirit of not bothering the user with technical details, it is kept well hidden, but a web-page can make it accessible, and use it as a platform for learning to program. </p><p> Besides explaining JavaScript, this book tries to be an introduction to the basic principles of programming. Programming, it turns out, is hard. The fundamental rules are, most of the time, simple and clear. But programs, while built on top of these basic rules, tend to become complex enough to introduce their own rules, their own complexity. Because of this, programming is rarely simple or predictable. As Donald Knuth, who is something of a founding father of the field, says, it is an art. </p><p> A program is many things. It is a piece of text typed by a programmer, it is the directing force that makes the computer do what it does, it is data in the computer's memory, yet it controls the actions performed on this same memory. Analogies that try to compare programs to objects we are familiar with tend to fall short, but a superficially fitting one is that of a machine. The gears of a mechanical watch fit together ingeniously, and if the watchmaker was any good, it will accurately show the time for many years. The elements of a program fit together in a similar way, and if the programmer knows what he is doing, the program will run without crashing.</p>
  <p>A computer is a machine built to act as a host for these immaterial machines. Computers themselves can only do stupidly straightforward things. The reason they are so useful is that they do these things at an incredibly high speed. A program can, by ingeniously combining many of these simple actions, do very complicated things.</p>
  <p>To some of us, writing computer programs is a fascinating game. A program is a building of thought. It is costless to build, weightless, growing easily under our typing hands. If we get carried away, its size and complexity will grow out of control, confusing even the one who created it. This is the main problem of programming. It is why so much of today's software tends to crash, fail, screw up.</p>
  <p>Today, many programmers believe that this complexity is best managed by using only a small set of well-understood techniques in their programs. They have composed strict rules about the form programs should have, and the more zealous among them will denounce those who break these rules as bad programmers.</p>
  <p>What hostility to the richness of programming! To try to reduce it to something straightforward and predictable, to place a taboo on all the weird and beautiful programs. The landscape of programming techniques is enormous, fascinating in its diversity, still largely unexplored. It is certainly littered with traps and snares, luring the inexperienced programmer into all kinds of horrible mistakes, but that only means you should proceed with caution, keep your wits about you. As you learn, there will always be new challenges, new territory to explore. The programmer who refuses to keep exploring will surely stagnate, forget his joy, lose the will to program (and become a manager).</p>
  <p>As far as I am concerned, the definite criterion for a program is whether it is correct. Efficiency, clarity, and size are also important, but how to balance these against each other is always a matter of judgement, a judgement that each programmer must make for himself. Rules of thumb are useful, but one should never be afraid to break them.</p>
  <p><It is, of course, possible that you can not read a chapter in one sitting. This means you will have to start halfway when you continue reading, but if you don't run all the code starting from the top of the chapter, some things might not work. By holding the shift key while pressing the 'run' arrow on a block of code, all blocks before that one will be run as well, so when you start in the middle of a chapter, hold shift the first time you run a piece of code, and everything should work as expected./p>
"
})
s1.user_id = 1
s1.save!

s2 = Section.new({
  resource_id: 1,
  title: "Values",
  body: "<p>Inside the computer's world, there is only data. That which is not data, does not exist. Although all data is in essence just a sequence of bits1, and is thus fundamentally alike, every piece of data plays its own role. In JavaScript's system, most of this data is neatly separated into things called values. Every value has a type, which determines the kind of role it can play. There are six basic types of values: Numbers, strings, booleans, objects, functions, and undefined values.</p>
  <p>To create a value, one must merely invoke its name. This is very convenient. You don't have to gather building material for your values, or pay for them, you just call for one and woosh, you have it. They are not created from thin air, of course. Every value has to be stored somewhere, and if you want to use a gigantic number of them at the same time you might run out of computer memory. Fortunately, this is only a problem if you need them all simultaneously. As soon as you no longer use a value, it will dissipate, leaving behind only a few bits. These bits are recycled to make the next generation of values.</p>
  <p>The number above has 64 bits. Numbers in JavaScript always do. This has one important repercussion: There is a limited amount of different numbers that can be expressed. With three decimal digits, only the numbers 0 to 999 can be written, which is 103 = 1000 different numbers. With 64 binary digits, 264 different numbers can be written. This is a lot, more than 1019 (a one with nineteen zeroes).</p>
  <p>Not all whole numbers below 1019 fit in a JavaScript number though. For one, there are also negative numbers, so one of the bits has to be used to store the sign of the number. A bigger issue is that non-whole numbers must also be represented. To do this, 11 bits are used to store the position of the fractional dot within the number.</p>
  <p>That leaves 52 bits3. Any whole number less than 252 (which is more than 1015) will safely fit in a JavaScript number. In most cases, the numbers we are using stay well below that, so we do not have to concern ourselves with bits at all. Which is good. I have nothing in particular against bits, but you do need a terrible lot of them to get anything done. When at all possible, it is more pleasant to deal with bigger things.</p>
  <p>Calculations with whole numbers (also called integers) that fit in 52 bits are guaranteed to always be precise. Unfortunately, calculations with fractional numbers are generally not. The same way that π (pi) can not be precisely expressed by a finite amount of decimal digits, many numbers lose some precision when only 64 bits are available to store them. This is a shame, but it only causes practical problems in very specific situations. The important thing is to be aware of it, and treat fractional digital numbers as approximations, not as precise values.</p>
  <p>For subtraction, there is the - operator, and division can be done with /. When operators appear together without parentheses, the order in which they are applied is determined by the precedence of the operators. The first example shows that multiplication has a higher precedence than addition. Division and multiplication always come before subtraction and addition. When multiple operators with the same precedence appear next to each other (1 - 1 + 1) they are applied left-to-right.</p>",
  prev_section_id: s1.id
})
s2.user_id = 1
s2.save!

s1.next_section_id = s2.id
s1.save!

s3 = Section.new({
  resource_id: 1,
  title: "Variables",
  body: "<p>Calculations with whole numbers (also called integers) that fit in 52 bits are guaranteed to always be precise. Unfortunately, calculations with fractional numbers are generally not. The same way that π (pi) can not be precisely expressed by a finite amount of decimal digits, many numbers lose some precision when only 64 bits are available to store them. This is a shame, but it only causes practical problems in very specific situations. The important thing is to be aware of it, and treat fractional digital numbers as approximations, not as precise values.</p>
  <p>For subtraction, there is the - operator, and division can be done with /. When operators appear together without parentheses, the order in which they are applied is determined by the precedence of the operators. The first example shows that multiplication has a higher precedence than addition. Division and multiplication always come before subtraction and addition. When multiple operators with the same precedence appear next to each other (1 - 1 + 1) they are applied left-to-right.</p>
  <p>There exists a unit that is bigger than an expression. It is called a statement. A program is built as a list of statements. Most statements end with a semicolon (;). The simplest kind of statement is an expression with a semicolon after it. This is a program:</p>
  <p></p>
  <p></p>
  ",
  prev_section_id: s2.id,
  parent_section_id: s2.id
})
s3.user_id = 1
s3.save!

s2.next_section_id = s3.id
s2.save!

s4 = Section.new({
  resource_id: 1,
  title: "Control Flow",
  body: "Here is some awesome information about Control Flow.",
  prev_section_id: s3.id
})
s4.user_id = 1
s4.save!

s3.next_section_id = s4.id
s3.save!

s5 = Section.new({
  resource_id: 1,
  title: "Functions",
  body: "Here is some awesome information about JS functions.",
  prev_section_id: s4.id
})
s5.user_id = 1
s5.save!

s4.next_section_id = s5.id
s4.save!

s6 = Section.new({
  resource_id: 1,
  title: "Data Structures",
  body: "Here is some awesome information about JS Data Structures.",
  prev_section_id: s5.id
})
s6.user_id = 1
s6.save!

s5.next_section_id = s6.id
s5.save!

s7 = Section.new({
  resource_id: 1,
  title: "Error Handling",
  body: "Here is some awesome information about JS Error Handling.",
  prev_section_id: s6.id
})
s7.user_id = 1
s7.save!

s6.next_section_id = s7.id
s6.save!

s8 = Section.new({
  resource_id: 1,
  title: "Functional Programming",
  body: "Here is some awesome information about JS Functional Programming.",
  prev_section_id: s7.id
})
s8.user_id = 1
s8.save!

s7.next_section_id = s8.id
s7.save!


n1 = Note.new({
  section_text: "When personal computers were first introduced, most of them came equipped with a simple programming language",
  body: "Im pretty sure this will be on the exam",
  private: true,
  section_id: 2,
  resource_id: 1
})
n1.user_id = 1
n1.save!

q1 = Question.new({
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
})

a1.user_id = 2
a1.save!

a2 = Answer.new({
  question_id: q1.id,
  body: "Here is a great post on closures from stack overflow http://stackoverflow.com/questions/111102/how-do-javascript-closures-work",
  correct: true
})

a2.user_id = 1
a2.save!

d1 = Discussion.new({
  title: "Javascript VS Coffee Script: Thoughts?",
  body: "I've recently learned about Coffee Script, it looks way better than JS from first glance, can this be true?",
  section_id: 2,
  resource_id: 1
})

d1.user_id = 1
d1.save!

c1 = Comment.new({
  body: "JS ALL THE WAY BABAY",
  commentable_type: "Discussion",
  commentable_id: 1
})
c1.user_id = 1
c1.save!



