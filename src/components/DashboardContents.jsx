import React from 'react';
import { Calendar,theme } from 'antd';

const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
export const WorkoutHistory = () => {
    
    const { token } = theme.useToken();
  const wrapperStyle = {
    width: 600,
    //height: 700,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG

  };
  return (
    
        <div style={wrapperStyle}>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
    
    
  );
  };

export const HomeContent = () => {
  return (
    <div className="home-content">
      <section className="welcome-section p-4">
        <h2 className="text-2xl font-bold text-[#00df98] mb-4">Welcome to Gym Logger!</h2>
        <p className="text-white">Track your workouts, monitor your progress, and stay motivated. Let's get started!</p>
      </section>

      <section className="recent-activities-section mt-8 p-4">
        <h2 className="text-xl font-bold text-[#00df98] mb-4">Recent Activities</h2>
        <ul className="text-white">
          <li>Bench Press - 3 sets of 10 reps</li>
          <li>Squats - 4 sets of 8 reps</li>
          <li>Deadlifts - 3 sets of 5 reps</li>
        </ul>
      </section>

      <section className="goals-section mt-8 p-4">
        <h2 className="text-xl font-bold text-[#00df98] mb-4">Your Goals</h2>
        <ul className="text-white">
          <li>Increase Bench Press by 10 lbs</li>
          <li>Run 5k in under 25 minutes</li>
          <li>Complete a Spartan Race</li>
        </ul>
      </section>

      <section className="upcoming-workouts-section mt-8 p-4">
        <h2 className="text-xl font-bold text-[#00df98] mb-4">Upcoming Workouts</h2>
        <ul className="text-white">
          <li>Monday - Upper Body Strength</li>
          <li>Wednesday - Lower Body Strength</li>
          <li>Friday - Full Body Workout</li>
        </ul>
      </section>
    </div>
  );
};


