"use client";

import Image from "next/image";

export default function Blog1Page() {
  return (
    <article className="max-w-4xl mx-auto py-12 px-5 sm:px-6 lg:px-8">
      {/* Blog Title */}
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900 leading-tight">
        In a Celebration of Excellence, Service, and Hope, 11 Teachers Honoured
      </h1>

      {/* Hero Image */}
      <div className="relative w-full h-80 sm:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
        <Image
          src="/blog/blog1.jpg"
          alt="Teachers Honoured"
          fill
          className="object-cover"
        />
      </div>

      {/* Blog Content */}
      <div className="prose prose-lg prose-slate max-w-full mx-auto">
        <p>
          Teachers are the architects of society’s future, shaping young minds and instilling values that last a lifetime. Their role extends beyond classrooms — they inspire, guide, and serve as pillars of strength for generations. In recognition of this invaluable contribution, a special ceremony recently honoured <strong>11 teachers</strong> for their dedication, excellence, and unwavering commitment to education.
        </p>

        <p>
          The event was not just an award function; it was a heartfelt celebration of service and hope. It brought together educators, students, and community leaders to acknowledge how teaching continues to transform lives even in challenging times.
        </p>

        <h2>Honouring Excellence in Education</h2>
        <p>
          The honoured teachers were selected for their outstanding achievements across different fields of teaching. From nurturing creativity in classrooms to introducing innovative learning methods, each awardee brought a unique contribution. Some were recognised for decades of service, while others for pioneering projects that opened new learning opportunities for children.
        </p>

        <p>
          One teacher implemented digital learning platforms in rural schools, bridging gaps for students with limited resources. Another created inclusive classrooms for children with special needs. A senior educator was praised for mentoring generations of students who have gone on to excel in diverse fields.
        </p>

        <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-700 my-6">
          "Education is more than books and exams — it is about shaping character, building confidence, and preparing students to face the world."
        </blockquote>

        <h2>Service Beyond the Classroom</h2>
        <p>
          Several awardees were recognised for extending their role beyond teaching duties. From organising literacy drives in villages to leading environmental campaigns, these teachers proved that education is deeply linked with social responsibility.
        </p>

        <p>
          Their initiatives showcased that a teacher’s influence spreads across communities, nurturing not just students but society at large. This spirit of service made the event truly special.
        </p>

        <h2>A Beacon of Hope for the Future</h2>
        <p>
          The ceremony also reminded attendees of the hope teachers bring into the lives of students. In today’s fast-changing world, children face numerous challenges — academic pressure, uncertainty about careers, and social issues. Teachers become mentors who reassure, guide, and ignite the courage to dream big.
        </p>

        <p>
          The honoured teachers stood as symbols of hope, demonstrating that education can light the darkest paths and open doors to countless possibilities.
        </p>

        <h2>Conclusion</h2>
        <p>
          The recognition of these 11 dedicated teachers was not merely about awards; it was about celebrating the essence of teaching itself. Excellence, service, and hope are the pillars that define the teaching profession, and these educators embodied all three.
        </p>

        <p>
          As the applause filled the hall, it was clear that this celebration was not just for the teachers present, but for every teacher who has ever touched a life. Their legacy lives on in the dreams of their students, in the communities they uplift, and in the bright future they continue to shape.
        </p>
      </div>
    </article>
  );
}
