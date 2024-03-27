import React from "react";

const About = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        <u>About iNotebook</u>
      </h2>

      {/* Description and Functionalities Section */}
      <div className="row">
        <div className="col-md-12">
          <h4>Introduction</h4>
          <p style={{ fontSize: "1.2rem" }}>
            Our note-taking app is designed to help users quickly jot down their
            thoughts, ideas, and reminders. It provides a simple interface for
            users to input their notes, including a title, description, and
            tags. The app stores these notes in a database, allowing users to
            access and manage them at any time.
          </p>
          <h4>Functionalities</h4>
          <ul style={{ fontSize: "1.2rem" }} >
            <li>
              <strong>User Authentication:</strong> Users can sign up and log in securely to
              access the app's features.
            </li>
            <li>
            <strong>Note Creation:</strong>Users can create new notes by providing a title,
              description, and optional tags.
            </li>
            <li>
            <strong>Note Listing: </strong>All created notes are listed in the app's interface
              for easy access and management.
            </li>
            <li>
            <strong>Note Editing:</strong> Users can edit existing notes to update the title,
              description, or tags as needed.
            </li>
            <li>
            <strong>Note Deletion:</strong> Users can delete unwanted notes from their
              collection.
            </li>
            
            <li>
            <strong>Tagging System:</strong> Users can organize notes by assigning tags, making
              it easier to categorize and filter them.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
