import { FourSquareBusinessScraper } from './scraper/foursquare/businessinfoscraper';
import prettyPrintJson from './scraper/prettyprintjson';

const businessScraper = new FourSquareBusinessScraper('57e822ed498e715ce7609025');
businessScraper.fetch().then(prettyPrintJson);
