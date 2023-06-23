import {useQuery} from "@tanstack/react-query";

const useMenu = () => {
  // const [menu, setMenu] = useState([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   fetch("https://bistro-boss-server-sigma-teal.vercel.app/menu")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMenu(data);
  //       setLoading(false);
  //     });
  // }, []);
  const {data: menu = [], refetch} = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await fetch(
        "https://bistro-boss-server-sigma-teal.vercel.app/menu"
      );
      return res.json();
    },
  });

  return [menu, refetch];
};

export default useMenu;
