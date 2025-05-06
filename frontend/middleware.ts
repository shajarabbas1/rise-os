import { NextRequest, NextResponse } from 'next/server';
import { axiosDockerInstance } from './services/axios';
import { UserRoleEnum } from './types/user.type';
import { PAGES_ROUTES } from './constants/routes.constants';
import { ENDPOINT } from './constants/api.constants';

const publicPaths = [PAGES_ROUTES.login, PAGES_ROUTES.signup];
const adminPaths = [PAGES_ROUTES.emailTemplate];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = publicPaths.some(
    publicPath => path === publicPath || path.startsWith(`${publicPath}/`),
  );

  const accessToken = request.cookies.get('accessToken')?.value;

  if (isPublicPath && accessToken) {
    return NextResponse.redirect(
      new URL(PAGES_ROUTES.careerDashboard, request.url),
    );
  }

  if (isPublicPath) {
    return NextResponse.next();
  }
  //check current path is admin path
  const isAdminPath = adminPaths.some(
    adminPath => path === adminPath || path.startsWith(`${adminPath}/`),
  );

  if (!accessToken) {
    const loginUrl = new URL(PAGES_ROUTES.login, request.url);
    loginUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const validateToken = await axiosDockerInstance.get(
      ENDPOINT.validateToken,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!validateToken.status) {
      const response = NextResponse.redirect(
        new URL(PAGES_ROUTES.login, request.url),
      );
      response.cookies.delete('accessToken');
      return response;
    }

    const userRole = validateToken.data.user.role;

    if (isAdminPath && userRole !== UserRoleEnum.SUPER_ADMIN) {
      return NextResponse.redirect(
        new URL(PAGES_ROUTES.careerDashboard, request.url),
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error validating token:', error);
    const response = NextResponse.redirect(
      new URL(PAGES_ROUTES.login, request.url),
    );
    response.cookies.delete('accessToken');
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/|api/public/).*)',
  ],
};
