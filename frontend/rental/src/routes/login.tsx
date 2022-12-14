import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUserLoginForm } from "../models/AuthModel";
import Constants from "../constants/Constants";
import { LoadingButton } from "@mui/lab";
import { authStore } from "../stores/auth.store";
import { useTranslation } from "react-i18next";

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLoginForm>();

  const onSubmit: SubmitHandler<IUserLoginForm> = async (
    data: IUserLoginForm
  ) => {
    await authStore.login(data).then(() => {
      navigate("/");
      window.location.reload();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        maxWidth={300}
        margin="auto"
        marginTop={2}
        padding={3}
      >
        <Typography variant="h3" mb={2}>
          {t("signIn")}
        </Typography>
        <Divider sx={{ width: "100%" }} />
        <TextField
          type="email"
          label="Email"
          margin="normal"
          autoFocus
          {...register("email", {
            required: t("requiredField")!,
            pattern: {
              value: Constants.validEmailRegEx,
              message: t("invalidEmailAddress")!,
            },
          })}
          error={!!errors?.email}
          helperText={errors?.email ? errors.email.message : null}
        />
        <TextField
          type="password"
          label={t("password")}
          margin="normal"
          style={{ marginBottom: "4px" }}
          {...register("password", {
            required: t("requiredField")!,
          })}
          error={!!errors?.password}
          helperText={errors?.password ? errors.password.message : null}
        />
        <Box>
          <Button
            variant="text"
            component={Link}
            to="/register"
            style={{ padding: 0, fontSize: 9, marginLeft: "145px" }}
          >
            {t("signUp")} <ArrowForwardIcon style={{ fontSize: 10 }} />
          </Button>
        </Box>
        <LoadingButton
          loading={authStore.loading}
          loadingIndicator="Loading.."
          variant="contained"
          type="submit"
          sx={{ marginTop: 2, bgcolor: "#DD5353" }}
        >
          {t("signIn")}
        </LoadingButton>
      </Box>
    </form>
  );
}
