import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Image,
} from 'react-native'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

import useLoginModel from './model'

export default function LoginView({
  email,
  senha,
  loading,
  erro,
  handleEmail,
  handleSenha,
  handleLogin,
  handleCriarConta,
  handleEsqueciSenha,
}: ReturnType<typeof useLoginModel>) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4B544" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={{ fontSize: 40 }}>👨</Text>
        </View>
        <Text style={styles.title}>Login</Text>
      </View>

      {/* FORM */}
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@email.com"
          value={email}
          onChangeText={handleEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          secureTextEntry
          value={senha}
          onChangeText={handleSenha}
        />

        {erro ? <Text style={styles.error}>{erro}</Text> : null}

        {/* BOTÕES */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.btnOutline}
            onPress={handleCriarConta}
          >
            <Text style={styles.btnOutlineText}>Criar conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>Entrar</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleEsqueciSenha}>
          <Text style={styles.link}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEAE6',
  },

  header: {
    backgroundColor: '#F4B544',
    height: hp('25%'),
    borderBottomLeftRadius: wp('6%'),
    borderBottomRightRadius: wp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatar: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('10%'),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('1%'),
  },

  title: {
    fontSize: wp('6%'),
    fontWeight: '800',
    color: '#fff',
  },

  form: {
    padding: wp('6%'),
  },

  label: {
    fontSize: wp('4%'),
    color: '#C48A2B',
    marginBottom: hp('0.5%'),
  },

  input: {
    width: '100%',
    height: hp('6.5%'),
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    paddingHorizontal: wp('4%'),
    marginBottom: hp('2%'),
    borderWidth: 1,
    borderColor: '#ddd',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
  },

  btnOutline: {
    width: '48%',
    height: hp('6%'),
    borderRadius: wp('3%'),
    borderWidth: 2,
    borderColor: '#F4B544',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnOutlineText: {
    color: '#F4B544',
    fontWeight: '700',
  },

  btnPrimary: {
    width: '48%',
    height: hp('6%'),
    backgroundColor: '#F4B544',
    borderRadius: wp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: '700',
  },

  link: {
    marginTop: hp('2%'),
    color: '#3B5BDB',
    textDecorationLine: 'underline',
  },

  error: {
    color: 'red',
    marginBottom: hp('1%'),
  },
})