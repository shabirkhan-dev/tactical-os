import { Dashboard } from "./modules/dashboard/index";
import {
	attachServiceWorkerStatusListeners,
	registerServiceWorker,
} from "./service-worker/register-client";

void registerServiceWorker();
attachServiceWorkerStatusListeners();

Dashboard();
