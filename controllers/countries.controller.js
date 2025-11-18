import Country from "../models/Country.js";

export const getCountries = async (req, res) => {
  const countries = await Country.find().sort({ countryName: 1 });
  res.json(countries);
};

export const getCountry = async (req, res) => {
  const country = await Country.findById(req.params.id);
  if (!country) return res.status(404).json({ message: "Country not found" });
  res.json(country);
};

export const createCountry = async (req, res) => {
  const { countryName } = req.body;

  const exists = await Country.findOne({ countryName });
  if (exists) return res.status(400).json({ message: "Country already exists" });

  const newCountry = await Country.create({ countryName });
  res.json({ message: "Country added", newCountry });
};

export const updateCountry = async (req, res) => {
  const { countryName } = req.body;

  const country = await Country.findById(req.params.id);
  if (!country) return res.status(404).json({ message: "Country not found" });

  country.countryName = countryName;
  await country.save();

  res.json({ message: "Country updated", country });
};

export const deleteCountry = async (req, res) => {
  await Country.findByIdAndDelete(req.params.id);
  res.json({ message: "Country deleted" });
};
