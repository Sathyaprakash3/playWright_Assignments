function grade(score)
{
    let grade=85
    switch(true)
    {
        case (score >= 90 && score <= 100):
      grade = "A";
      break;
    case (score >= 80 && score < 90):
      grade = "B";
      break;
    case (score >= 70 && score < 80):
      grade = "C";
      break;
    case (score >= 60 && score < 70):
      grade = "D";
      break;
    case (score >= 0 && score < 60):
      grade = "F";
      break;
    default:
      grade = "Invalid score";
    }

  return grade;
    

}
console.log(grade(95)); 
console.log(grade(82)); 
console.log(grade(45)); 
console.log(grade(105)); 