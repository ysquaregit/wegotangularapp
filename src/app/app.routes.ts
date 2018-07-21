import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {DashboardVenComponent} from "./pages/dashboard-ven/dashboard-ven.component";
import {VenblockComponent} from "./pages/venblock/venblock.component";
import {ReportsComponent} from "./pages/reports/reports.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {InvoiceComponent} from "./pages/invoices/invoice.component";
import {LoginRedirect} from "./services/login-redirect.service";
import {EnsureAuthenticated} from "./services/ensure-authenticated.service";
import {VisualComponent} from "./pages/visual/visual.component";
export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginRedirect]
    },
    {
        path: 'homepage',
        component: HomepageComponent,
        canActivate: [EnsureAuthenticated]
    },
    {
        path: 'dashboard',
        component: DashboardVenComponent,
        canActivate: [EnsureAuthenticated]
    },
    {
        path: 'visual',
        component: VisualComponent,
        canActivate: [EnsureAuthenticated]
    },
    {
        path: 'venaqua',
        component: VenblockComponent,
        canActivate: [EnsureAuthenticated]
    },
    {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [EnsureAuthenticated]
    },
    {
        path: 'invoice',
        component: InvoiceComponent,
        canActivate: [EnsureAuthenticated]
    },
    {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [EnsureAuthenticated]
    }
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);