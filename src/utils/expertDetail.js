import Mathematics from "../assets/experts/mathematics.jpg";
import Physics from "../assets/experts/physics.jpg";
import Chemistry from "../assets/experts/chemistry.jpg";
import Biology from "../assets/experts/biology.jpg";
import Literature from "../assets/experts/literature.jpg";
import Engineering from "../assets/experts/engineering.jpg";
import ComputerScience from "../assets/experts/computer-science.jpg";
import History from "../assets/experts/history.jpg";
import Catalyst from "../assets/experts/catalyst.png";

function expertDetail(expertId) {
  let expertIcon, expert, title, desc, cardContent;
  switch (expertId) {
    case "learning":
      expertIcon = Catalyst;
      expert = "learning";
      title = "Learning";
      desc = "Let's learn something new today!";
      cardContent = [
        "Help understand blockchain technology",
        "Help understand Quantum Mechanics",
        "Help write a short story",
        "Help me solve algebric problem",
      ];
      break;
    case "mathematics":
      expertIcon = Mathematics;
      expert = "mathematics";
      title = "Mathematics";
      desc = "I will help you to solve mathematics related problems";
      cardContent = [
        "Help me solve calculus problems",
        "Understand the concept of linear algebra",
        "How can I solve quadratics equations?",
        "What is the difference between permutations and combinations?",
      ];
      break;
    case "physics":
      expertIcon = Physics;
      expert = "physics";
      title = "Physics";
      desc = "I will help you to solve physics related problems";
      cardContent = [
        "Explain the theory of relativity",
        "How does quantum mechanics work?",
        "What is Newton's third law?",
        "Describe the wave-particle duality",
      ];
      break;
    case "chemistry":
      expertIcon = Chemistry;
      expert = "chemistry";
      title = "Chemistry";
      desc = "I will help you to understand chemistry related concepts";
      cardContent = [
        "Help me understand chemical bonding",
        "Explain the periodic table trends",
        "What are acids and bases?",
        "How do chemical reactions occur?",
      ];
      break;
    case "biology":
      expertIcon = Biology;
      expert = "biology";
      title = "Biology";
      desc = "I will help you to understand biology related concepts";
      cardContent = [
        "What is the structure of a cell?",
        "Explain the process of photosynthesis",
        "How does the human circulatory system work?",
        "Describe the theory of evolution",
      ];
      break;
    case "literature":
      expertIcon = Literature;
      expert = "literature";
      title = "Literature";
      desc = "I will help you to understand literature related concepts";
      cardContent = [
        "Analyze the themes in 'To Kill a Mockingbird'",
        "What are the characteristics of Romantic poetry?",
        "Explain the plot of '1984' by George Orwell",
        "Discuss the symbolism in 'The Great Gatsby'",
      ];
      break;
    case "history":
      expertIcon = History;
      expert = "history";
      title = "History";
      desc = "I will help you to understand history related concepts";
      cardContent = [
        "What caused World War II?",
        "Explain the significance of the Renaissance",
        "Who were the major figures in the American Civil War?",
        "Describe the Industrial Revolution",
      ];
      break;
    case "computer-science":
      expertIcon = ComputerScience;
      expert = "computer-science";
      title = "Computer Science";
      desc = "I will help you to understand computer science related concepts";
      cardContent = [
        "What is an algorithm?",
        "Explain the concept of data structures",
        "How do computer networks function?",
        "What is object-oriented programming?",
      ];
      break;
    case "engineering":
      expertIcon = Engineering;
      expert = "engineering";
      title = "Engineering";
      desc = "I will help you to understand engineering related concepts";
      cardContent = [
        "How does a bridge support weight?",
        "Explain the principles of thermodynamics",
        "What is electrical circuit design?",
        "Describe the process of civil engineering",
      ];
      break;
  }

  return { expertIcon, expert, title, desc, cardContent };
}

export default expertDetail;
