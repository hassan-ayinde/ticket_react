import React from "react";

const Features = () => {
  return (
    <section className="w-[75%] mx-auto my-0 mb-10 md:my-20 flex flex-col gap-8">
      <div className="text-center mb-7">
        <h2 className="font-black">Everything you need, nothing you don't.</h2>
        <p>
          SupportFlow is designed to be powerful, yet simple to use. Here's a
          glimpse of what you can do:
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3>Effortless Ticket Creation </h3>
          <p>
            Our intuitive interface allows agents to create, track, and manage
            tickets with ease. Customize fields, set priorities, and link
            related tickets to ensure all necessary information is captured from
            the start.
          </p>
        </div>
        <div>
          <h3>Smart Task Assignment</h3>
          <p>
            Define rules to automatically assign tickets to the right team
            members based on their skills, workload, and availability. This
            ensures a balanced and efficient distribution of tasks.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3>Insightful Analytics </h3>
          <p>
            Our easy-to-read dashboards provide valuable insights into your
            support performance. Track key metrics like resolution time, agent
            performance, and customer satisfaction to identify trends.
          </p>
        </div>
        <div>
          <h3>Secure & Reliable</h3>
          <p>
            With enterprise-grade security and a 99.9% uptime guarantee, you can
            trust SupportFlow to keep your data safe and your service running
            smoothly around the clock.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
