import SectionTitle from "../../../components/SectionTitle";
import MenuItem from "../../Shared/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popularItems = menu.filter((item) => item.category === "popular");

  return (
    <section>
      <SectionTitle subHeading={"Popular Items"} heading={"From Our Menu"} />
      <div className="grid lg:grid-cols-2 gap-10 justify-center mx-5">
        {popularItems.map((item) => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default PopularMenu;
