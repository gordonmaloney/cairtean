import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getAllGoals, reset } from "../features/goals/allGoalSlice";

function AllGoals() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { allGoals, isLoading, isError, message } = useSelector(
    (state) => state.allGoals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getAllGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  console.log(allGoals);

  return (
    <>
      <h3>All Goals - All Users</h3>
      {allGoals.map((goal) => (
        <>{goal.text} - </>
      ))}
    </>
  );
}

export default AllGoals;
