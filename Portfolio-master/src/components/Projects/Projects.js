import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
// import leaf from "../../Assets/Projects/leaf.png";
// import emotion from "../../Assets/Projects/emotion.png";
import foody from "../../Assets/Projects/foody.png";
import dicegame from "../../Assets/Projects/dicegame.png";
// import suicide from "../../Assets/Projects/suicide.png";
import expensemanager from "../../Assets/Projects/expensemanager.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={dicegame}
              isBlog={false}
              title="Dice Game"
              description="Dice Game is a fun and interactive React.js app with a sleek UI. Players roll two dice with a click, and results are displayed instantly. It features randomized rolls, score tracking, and a reset option. Smooth animations enhance the experience, making it exciting and engaging! 🎲"
              ghLink="https://github.com/ajujawade/REACT-JS-Projects/tree/main/Dice-Game"
              demoLink="https://dicegame-ajay.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={expensemanager}
              isBlog={false}
              title="Expense Manager"
              description="The Student Expense Manager is a JSP & Servlet-based web application designed to help students track their daily expenses and manage their monthly budget efficiently. It allows students to log their spending, categorize expenses, and monitor their financial health with ease."
              ghLink="https://github.com/ajujawade/Expense-Manager"
              // demoLink=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={foody}
              isBlog={false}
              title="Foody Zone"
              description="Foody Zone is a clean and simple ReactJS web app that displays daily menus categorized into Breakfast, Lunch, and Dinner. Users can easily navigate through the menu to explore available meal options for each time of the day."
              ghLink="https://github.com/ajujawade/REACT-JS-Projects/tree/main/Foody-Zone"
            />
          </Col>

          {/* <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Plant AI"
              description="Used the plant disease dataset from Kaggle and trained a image classifer model using 'PyTorch' framework using CNN and Transfer Learning with 38 classes of various plant leaves. The model was successfully able to detect diseased and healthy leaves of 14 unique plants. I was able to achieve an accuracy of 98% by using Resnet34 pretrained model."
              ghLink="https://github.com/soumyajit4419/Plant_AI"
              demoLink="https://plant49-ai.herokuapp.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={suicide}
              isBlog={false}
              title="Ai For Social Good"
              description="Using 'Natural Launguage Processing' for the detection of suicide-related posts and user's suicide ideation in cyberspace  and thus helping in sucide prevention."
              ghLink="https://github.com/soumyajit4419/AI_For_Social_Good"
              // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" <--------Please include a demo link here
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              isBlog={false}
              title="Face Recognition and Emotion Detection"
              description="Trained a CNN classifier using 'FER-2013 dataset' with Keras and tensorflow backened. The classifier sucessfully predicted the various types of emotions of human. And the highest accuracy obtained with the model was 60.1%.
              Then used Open-CV to detect the face in an image and then pass the face to the classifer to predict the emotion of a person."
              ghLink="https://github.com/soumyajit4419/Face_And_Emotion_Detection"
              // demoLink="https://blogs.soumya-jit.tech/"      <--------Please include a demo link here 
            />
          </Col> */}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
