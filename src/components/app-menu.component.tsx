import React, {useCallback} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {FaCirclePlay} from "react-icons/fa6";
import {HiRectangleStack} from "react-icons/hi2";
import {AiFillQuestionCircle} from "react-icons/ai";
import {IAuthState, useAuthStore} from "../store/auth/auth-store.ts";
import {Button} from "./utils/button.component.tsx";
import {logout} from "../store/auth/auth-store.actions.ts";
import {UserAvatar} from "./utils/user-avatar.component.tsx";
import {AppSettings} from "./settings/app-settings.component.tsx";
import {useSettingsStore} from "../store/settings/settings-store.ts";

const userSelector = (state: IAuthState) => state;

export const AppMenu: React.FC = () => {
	const navigate = useNavigate();
	const user = useAuthStore(userSelector);
	const isBusy = useSettingsStore((state) => state?.busy);

	const handleLogout = useCallback(() => {
		void logout();
	}, []);

	const handleLogin = useCallback(() => {
		navigate('/login');
	}, []);

	const loggedIn = user.loginData.id && !user.fetching;
	if (user.fetching || isBusy) {
		return null;
	}

	return <nav id='app-menu'>
		<div className={'app-menu-content'}>
			<ul>
				<li className={'menu-logo home'}>
					<NavLink to="/home">
						<svg viewBox="0 0 1024 1024">
							<path
								d="M 391.096954 1013.615723 C 374.425537 1017.198914 356.670593 1009.773499 347.857239 994.136963 L 15.43833 404.366821 C 4.59113 385.121887 11.398387 360.727844 30.643307 349.880676 L 346.262939 171.984802 C 349.58374 193.986633 353.139709 219.067932 356.934204 247.281433 C 365.390686 310.158691 376.70459 414.690308 390.874634 560.881104 L 393.690277 590.526978 C 402.063202 673.425903 407.366913 733.708374 409.601532 771.37616 C 410.744965 792.773315 411.241974 819.453918 411.092529 851.418579 C 410.610992 890.064453 411.627686 914.976501 414.142609 926.155518 C 417.050476 939.081238 424.931122 949.23645 437.786621 956.620972 C 450.642151 964.005615 464.406891 966.047241 479.079315 962.746399 C 483.550232 961.740601 487.747345 960.486633 491.677124 958.98938 L 402.343323 1009.34198 C 398.734924 1011.375854 394.944244 1012.788879 391.096954 1013.615723 Z M 510.305542 948.490479 C 513.101624 946.234009 515.656006 943.758179 517.967285 941.06134 C 527.124695 930.37616 530.830933 917.888489 529.084717 903.600403 C 527.93219 893.583008 526.054871 881.159729 523.452759 866.330078 L 517.060974 828.129639 C 519.725342 807.343872 526.598389 781.207397 537.68219 749.718994 C 548.765991 718.230713 563.540588 683.15979 582.004456 644.505676 C 595.819641 684.706543 620.352966 724.423401 655.604675 763.655457 C 677.750061 788.301392 700.779236 809.632263 724.69281 827.651855 L 510.305542 948.490479 Z M 841.546875 761.787109 C 820.352051 754.251221 798.220154 743.984436 775.150635 730.979858 C 742.575134 712.616638 712.703308 688.32373 685.53418 658.100525 C 658.365112 627.87738 639.874146 592.582642 630.058899 552.216064 C 639.657898 524.731934 650.941284 499.438354 663.911255 476.334229 C 676.881226 453.230103 692.947998 429.612976 712.110107 405.482849 C 719.813416 395.675354 728.340881 385.866089 737.694763 376.054199 C 747.048706 366.242371 752.752747 360.187866 754.805176 357.891052 C 775.023926 336.826416 789.388916 319.924316 797.900146 307.182312 C 806.411377 294.440308 809.291382 281.955078 806.54071 269.728088 C 805.99231 267.290588 805.331177 264.950745 804.558716 262.706726 L 1007.316589 622.437378 C 1018.163818 641.682312 1011.356567 666.076294 992.111633 676.923462 L 841.546875 761.787109 Z M 494.887451 658.598877 C 490.47818 621.053345 485.003876 569.801147 478.464447 504.841003 C 463.394928 356.283386 453.507782 243.814148 448.802765 167.430603 C 448.383911 155.78009 448.554749 139.409302 449.315155 118.317871 C 449.416077 116.761414 449.509949 115.237122 449.597015 113.742065 L 620.41394 17.463684 C 639.658875 6.616516 664.052856 13.423767 674.900024 32.66864 L 794.77002 245.339905 C 791.39801 241.411072 787.407288 238.017395 782.797791 235.156799 C 770.427002 227.479614 755.682678 225.565613 738.564819 229.416626 C 704.678528 237.039917 666.576843 277.725769 624.260681 351.474731 C 581.944519 425.223633 538.821106 527.597412 494.887451 658.598877 Z"/>
						</svg>
						Kardissimo
					</NavLink>
				</li>

				{loggedIn && <>
					<li>
						<NavLink to="/run">
							<FaCirclePlay/>
							Run
						</NavLink>
					</li>
					<li>
						<NavLink to="/cardboxes">
							<HiRectangleStack/>
							Card boxes
						</NavLink>
					</li>
					<li>
						<NavLink to="/faq">
							<AiFillQuestionCircle/>
							FAQ
						</NavLink>
					</li>

					<li className={'icon-only'}>
						<AppSettings/>
					</li>
				</>}

				{!loggedIn && <li className={'login'}>
					Please <Button type={'danger'} onClick={handleLogin}>Login</Button> here
				</li>}
			</ul>

			{loggedIn && <div className={'user-avatar'} tabIndex={0}>
				<UserAvatar src={user.loginData.avatar} name={user.loginData.name}/>

				<div className={'actions'}>
					<p>
						Logged in as <b>{user.loginData.name}</b>
					</p>
					<Button type={'danger'} onClick={handleLogout}>Log out</Button>
				</div>
			</div>}
		</div>
	</nav>;
};
