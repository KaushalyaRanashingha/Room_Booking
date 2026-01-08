export default function FoodCard({ food }) {
  return (
    <div className="food-card">
      <img src={food.image} alt={food.name} />
      <div className="food-info">
        <h4>{food.name}</h4>
        <p>${food.price}</p>
        <button className="btn-primary">Order Now</button>
      </div>
    </div>
  );
}
