import { useState } from "react";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";
import API from "../api/axios";

const Dashboard = () => {
  const [profile, setProfile] = useState({
    age: "",
    gender: "Male",
    height: "",
    weight: "",
    preference: "Vegetarian",
    goal: "Maintain Weight"
  });

  const [summary, setSummary] = useState({
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0
});

  const [plan, setPlan] = useState(null);

  const calculateIBW = () => {
    const heightInInches =
      profile.height / 2.54;

    if (profile.gender === "Male") {
      return (
        50 +
        2.3 * (heightInInches - 60)
      ).toFixed(1);
    }

    return (
      45.5 +
      2.3 * (heightInInches - 60)
    ).toFixed(1);
  };

  const calculateBMI = () => {
    const h =
      profile.height / 100;

    return (
      profile.weight /
      (h * h)
    ).toFixed(1);
  };

  const generatePlan = async () => {
    try {
      const res = await API.post(
        "/nutrition/generate",
        profile
      );

      const nutritionPlan =
  res.data.nutritionPlan;

setPlan(nutritionPlan);

setSummary({
  calories:
    nutritionPlan.totalCalories || 0,

  protein:
    nutritionPlan.totalProtein || 0,

  carbs:
    nutritionPlan.totalCarbs || 0,

  fat:
    nutritionPlan.totalFat || 0
});

    } catch (error) {
  console.log(error);

  alert(
    error?.response?.data?.message ||
    error.message ||
    "Something went wrong"
  );
}
  };

  const savePlan = async () => {
  try {

    await API.put(
      `/nutrition/${plan._id}`,
      {
        meals: plan.meals
      }
    );

    alert("Plan Updated");

  } catch (error) {

    alert("Update Failed");

  }
};

const exportPDF = () => {
  if (!plan) {
    alert("Generate a nutrition plan first");
    return;
  }

  const doc = new jsPDF();

  let y = 20;

  // Title
  doc.setFontSize(20);
  doc.text("AI Nutrition Dashboard Report", 20, y);

  y += 15;

  // User Profile
  doc.setFontSize(14);
  doc.text("User Profile", 20, y);

  y += 10;

  doc.setFontSize(11);

  doc.text(`Age: ${profile.age}`, 20, y);
  y += 8;

  doc.text(`Gender: ${profile.gender}`, 20, y);
  y += 8;

  doc.text(`Height: ${profile.height} cm`, 20, y);
  y += 8;

  doc.text(`Weight: ${profile.weight} kg`, 20, y);
  y += 8;

  doc.text(`Preference: ${profile.preference}`, 20, y);
  y += 8;

  doc.text(`Goal: ${profile.goal}`, 20, y);

  y += 15;

  // Health Metrics
  doc.setFontSize(14);
  doc.text("Health Metrics", 20, y);

  y += 10;

  doc.setFontSize(11);

  doc.text(
    `BMI: ${
      profile.height && profile.weight
        ? calculateBMI()
        : "-"
    }`,
    20,
    y
  );

  y += 8;

  doc.text(
    `Ideal Body Weight: ${
      profile.height
        ? calculateIBW()
        : "-"
    } kg`,
    20,
    y
  );

  y += 15;

  // Nutrition Summary
  doc.setFontSize(14);
  doc.text("Nutrition Summary", 20, y);

  y += 10;

  doc.setFontSize(11);

  doc.text(
    `Calories: ${summary.calories}`,
    20,
    y
  );

  y += 8;

  doc.text(
    `Protein: ${summary.protein} g`,
    20,
    y
  );

  y += 8;

  doc.text(
    `Carbohydrates: ${summary.carbs} g`,
    20,
    y
  );

  y += 8;

  doc.text(
    `Fat: ${summary.fat} g`,
    20,
    y
  );

  y += 15;

  // Meals
  doc.setFontSize(14);
  doc.text("Meal Plan", 20, y);

  y += 10;

  plan.meals.forEach((meal) => {

    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(12);

    doc.text(
      `${meal.meal} (${meal.time})`,
      20,
      y
    );

    y += 8;

    meal.foods.forEach((food) => {

      if (y > 280) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(10);

      doc.text(
        `• ${food.name} | ${food.quantity} | Cal:${food.calories} | Protein:${food.protein}g`,
        25,
        y
      );

      y += 7;
    });

    y += 5;
  });

  // Recommendations
  if (y > 240) {
    doc.addPage();
    y = 20;
  }

  y += 10;

  doc.setFontSize(14);
  doc.text(
    "Daily Recommendations",
    20,
    y
  );

  y += 10;

  doc.setFontSize(11);

  doc.text(
    "Stay hydrated, maintain meal timings, and follow the nutrition plan consistently.",
    20,
    y,
    { maxWidth: 170 }
  );

  doc.save("AI-Nutrition-Plan.pdf");
};

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="row">

          {/* Profile */}

          <div className="col-md-4">

            <div className="card shadow p-3">

              <h4>
                User Profile
              </h4>

              <input
                className="form-control mb-2"
                placeholder="Age"
                onChange={(e)=>
                  setProfile({
                    ...profile,
                    age:e.target.value
                  })
                }
              />

              <select
                className="form-select mb-2"
                onChange={(e)=>
                  setProfile({
                    ...profile,
                    gender:e.target.value
                  })
                }
              >
                <option>
                  Male
                </option>

                <option>
                  Female
                </option>
              </select>

              <input
                className="form-control mb-2"
                placeholder="Height (cm)"
                onChange={(e)=>
                  setProfile({
                    ...profile,
                    height:e.target.value
                  })
                }
              />

              <input
                className="form-control mb-2"
                placeholder="Weight (kg)"
                onChange={(e)=>
                  setProfile({
                    ...profile,
                    weight:e.target.value
                  })
                }
              />

              <select
                className="form-select mb-2"
                onChange={(e)=>
                  setProfile({
                    ...profile,
                    preference:e.target.value
                  })
                }
              >
                <option>
                  Vegetarian
                </option>

                <option>
                  Vegan
                </option>

                <option>
                  Eggetarian
                </option>

                <option>
                  Non-Vegetarian
                </option>

              </select>

              <select
                className="form-select mb-3"
                onChange={(e)=>
                  setProfile({
                    ...profile,
                    goal:e.target.value
                  })
                }
              >
                <option>
                  Weight Gain
                </option>

                <option>
                  Weight Loss
                </option>

                <option>
                  Maintain Weight
                </option>

              </select>

              <button
                className="btn btn-success w-100"
                onClick={generatePlan}
              >
                Generate AI Plan
              </button>

            </div>
          </div>

          {/* --------------- */}
          

          {/* Metrics */}

          <div className="col-md-8">

            <div className="row mt-4">

  <div className="col-md-3">
    <div className="card text-center shadow">
      <div className="card-body">
        <h5>Calories</h5>
        <h3>{summary.calories}</h3>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card text-center shadow">
      <div className="card-body">
        <h5>Protein</h5>
        <h3>{summary.protein}g</h3>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card text-center shadow">
      <div className="card-body">
        <h5>Carbs</h5>
        <h3>{summary.carbs}g</h3>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card text-center shadow">
      <div className="card-body">
        <h5>Fat</h5>
        <h3>{summary.fat}g</h3>
      </div>
    </div>
  </div>

</div>

            <div className="row">

              <div className="col-md-6">

                <div className="card p-3 shadow">

                  <h5>BMI</h5>

                  <h2>
                    {
                      profile.height &&
                      profile.weight
                        ? calculateBMI()
                        : "-"
                    }
                  </h2>

                </div>

              </div>

              <div className="col-md-6">

                <div className="card p-3 shadow">

                  <h5>
                    Ideal Body Weight
                  </h5>

                  <h2>
                    {
                      profile.height
                        ? calculateIBW()
                        : "-"
                    } kg
                  </h2>

                </div>

              </div>

            </div>

            {plan && (

  <div className="card mt-4 shadow">

    <div className="card-body">

      <div className="d-flex justify-content-between align-items-center mb-3">

        <h4>
          AI Nutrition Plan
        </h4>

        <button
          className="btn btn-warning"
          onClick={savePlan}
        >
          Save Changes
        </button>

        <button
    className="btn btn-danger"
    onClick={exportPDF}
  >
    Export PDF
  </button>

      </div>

                  {plan.meals?.map(
                    (meal, index) => (

                      <div
                        key={index}
                        className="mb-4"
                      >

                        <h5>
                          {meal.meal}
                        </h5>

                        <p>
                          Time:
                          {" "}
                          {meal.time}
                        </p>

                        <table className="table">

                          <thead>

                            <tr>

                              <th>
                                Food
                              </th>

                              <th>
                                Qty
                              </th>

                              <th>
                                Calories
                              </th>

                              <th>
                                Protein
                              </th>

                            </tr>

                          </thead>

                          <tbody>

                            {meal.foods.map(
                              (
                                food,
                                idx
                              ) => (

                                <tr
                                  key={idx}
                                >

                                  <td>
  <input
    className="form-control"
    value={food.name}
    onChange={(e) => {
      const updated = structuredClone(plan);

      updated.meals[index]
        .foods[idx]
        .name = e.target.value;

      setPlan(updated);
    }}
  />
</td>

                                  <td>
  <input
    className="form-control"
    value={food.quantity}
    onChange={(e) => {
      const updated = structuredClone(plan);

      updated.meals[index]
        .foods[idx]
        .quantity =
          e.target.value;

      setPlan(updated);
    }}
  />
</td>

                                  <td>
                                    {
                                      food.calories
                                    }
                                  </td>

                                  <td>
                                    {
                                      food.protein
                                    }
                                  </td>

                                </tr>

                              )
                            )}

                          </tbody>

                        </table>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </>
  );
};

export default Dashboard;